import React, { Component } from 'react';
import { setClass } from 'cat-util';

class GridTh extends Component {
  static propTypes = {
    column: React.PropTypes.object,
    orderFunc: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool
    ])
  }

  static defaultProps = {
    column: {},
    orderFunc: false
  }

  _handleClick(event) {
    let { column } = this.props;
    this.props.handleOrder(column.name, column.orderBy);
  }

  render() {
    let { column, orderFunc } = this.props;
    let classes;

    if (column.orderBy) {
      let unsorted = !orderFunc || (orderFunc && orderFunc.key !== column.name);
      classes = setClass({
            'sort': unsorted,
            'sort-by-attributes': !unsorted && orderFunc.forward,
            'sort-by-attributes-alt': !unsorted && !orderFunc.forward
          });
    }


    return (
    <th>
      { column.label }
      {
        column.orderBy && <i className={`glyphicon glyphicon-${classes}`} onClick={this::this._handleClick} />
      }
    </th>
    );
  }
}

export default GridTh;
