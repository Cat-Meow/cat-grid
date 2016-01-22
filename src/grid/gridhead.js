import React, {Component} from 'react';
import GridTh from './gridth.js';

class GridHead extends Component {
  static propTypes = {
    columns: React.PropTypes.array,
    myStyle: React.PropTypes.string,
    enableSelection: React.PropTypes.bool,
    selectAll: React.PropTypes.bool,
    orderFunc: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool
    ])
  }

  static defaultProps = {
    columns: [],
    myStyle: 'active',
    enableSelection: false,
    selectAll: false,
    orderFunc: false
  }


    _handleClick = (event) => {
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

    renderSelection() {
        let { enableSelection, selectAll } = this.props,
            iconClass = selectAll ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked';
        if (!enableSelection) {
            return null;
        } else {
            return (
                <th onClick={this._handleClick} className="table-th-hover">
                    <i className={iconClass} />
                </th>        
            );
        }
    }

  render() {
    let { columns, orderFunc, myStyle } = this.props,
        self = this;

    return (
      <thead>
        <tr className={myStyle}>
        { this.renderSelection() }
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
