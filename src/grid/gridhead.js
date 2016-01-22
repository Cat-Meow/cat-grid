import React, {Component} from 'react';
import GridTh from './gridth.js';

class GridHead extends Component {
  static propTypes = {
    columns: React.PropTypes.array,
    myStyle: React.PropTypes.string,
    selected: React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.array
    ]),
    selectAll: React.PropTypes.bool,
    orderFunc: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool
    ])
  }

  static defaultProps = {
    columns: [],
    myStyle: 'active',
    selected: false,
    selectAll: false,
    orderFunc: false
  }


  _handleClick(event) {
    this.props.onSelect('-1');
  }

  _handleOrder(newKey, func) {
    let { orderFunc } = this.props;
    if (!orderFunc || orderFunc.key !== newKey) {
      orderFunc = {
        key: newKey,
        func: func,
        forward: true
      }
    } else if (orderFunc.forward) {
      orderFunc.forward = false;
    } else {
      orderFunc = false;
    }
    this.props.updateOrder(orderFunc);
  }

  render() {
    let { columns, orderFunc, myStyle, selected, selectAll } = this.props;
    let self = this;

    return (
      <thead>
        <tr className={myStyle}>
        {
          selected &&
          <th onClick={this::this._handleClick} className="table-th-hover">
            <i className={selectAll ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked'} />
          </th> 
        }
        {
          columns.map((column) => {
            return (
              <GridTh
                key={column.label}
                column={column}
                orderFunc={orderFunc}
                handleOrder={self::self._handleOrder}
              />
            );  
          })
        }
        </tr>
      </thead>
    );
  }
};

export default GridHead;
