import React, {Component} from 'react';
import GridTd from './gridtd.js';

class GridRow extends Component {
  static propTypes = {
    row: React.PropTypes.object,
    rows: React.PropTypes.object,
    columns: React.PropTypes.array,
    info: React.PropTypes.object,
    enableSelection: React.PropTypes.bool,
    ifSelected: React.PropTypes.bool
  }

  static defaultProps = {
    row: {},
    rows: [],
    columns: [],
    info: {},
    enableSelection: false,
    isSelected: false
  }

  _handleClick(event) {
    this.props.onSelect(this.props.info.keyValue);
  }

  render() {
    let { row, rows, columns, info, enableSelection, ifSelected } = this.props;
    let className = '';
    let divStyle = {};

    if (rows.className) {
      className = typeof rows.className === 'string' ? rows.className : rows.className(row, info);
    }

    if (rows.divStyle) {
      divStyle = rows.divStyle(row, info);
    }

    return (
      <tr className={className} style={divStyle}>
        {
          enableSelection &&
          <td onClick={this::this._handleClick} className="table-td-hover">
            <i className={ifSelected ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked'} />
          </td>
        }
        {
          columns.map((column, index) => {
            return (
              <GridTd
                key={`grid-td-${index}`}
                row={row}
                column={column}
                info={info}
                index={index}
              />
            );
          })
        }
      </tr>
    );
  }
}

export default GridRow;
