/* @flow */

import React, {PropTypes} from 'react';
import {findDOMNode} from 'react-dom';

type State = {
  highlighted: boolean;
};

export default class MenuListItem extends React.Component {
  _menuListHandle: Object;
  state: State = {
    highlighted: false
  };
  static propTypes = {
    index: PropTypes.number,

    className: PropTypes.string,
    highlightedClassName: PropTypes.string,
    style: PropTypes.object,
    highlightedStyle: PropTypes.object,

    onSelect: PropTypes.func,
    onHighlightChange: PropTypes.func,
    onLeftPushed: PropTypes.func,
    onRightPushed: PropTypes.func,
    onUpPushed: PropTypes.func,
    onDownPushed: PropTypes.func
  };

  static contextTypes = {
    menulist: React.PropTypes.object
  };

  takeKeyboard() {
    //TODO
  }

  releaseKeyboard() {
    //TODO
  }

  componentDidMount() {
    this._menuListHandle = this.context.menulist.registerItem(this.props, {
      setHighlighted: (highlighted: boolean) => {
        this.setState({highlighted}, () => {
          if (highlighted) {
            const el = findDOMNode(this);
            if (el.scrollIntoViewIfNeeded) {
              el.scrollIntoViewIfNeeded();
            } else if (el.scrollIntoView) {
              el.scrollIntoView();
            }
          }
        });
        if (this.props.onHighlightChange) {
          this.props.onHighlightChange(highlighted);
        }
      }
    });
  }

  componentWillUnmount() {
    this._menuListHandle.unregister();
  }

  render() {
    const {onSelect} = this.props;
    const {highlighted} = this.state;

    let style = this.props.style;
    let className = this.props.className;
    if (highlighted) {
      if (this.props.highlightedStyle) {
        style = {...style, ...this.props.highlightedStyle};
      }
      if (this.props.highlightedClassName) {
        className = `${className||''} ${this.props.highlightedClassName}`;
      }
    }

    return (
      <div
        style={style}
        className={className}
        onClick={onSelect}
        onMouseEnter={null}
        onMouseLeave={null}
        >
        List Item: {this.props.children}
      </div>
    )
  }
}