import React, {Component} from 'react';
import GridTd from './gridtd.js';

class GridRow extends Component {
  static propTypes = {
    row: React.PropTypes.object,
    columns: React.PropTypes.array,
    info: React.PropTypes.object,
    enableSelection: React.PropTypes.bool,
    ifSelected: React.PropTypes.bool
  }

  static defaultProps = {
    row: {},
    columns: [],
    info: {},
    enableSelection: false,
    isSelected: false
  }

  _handleClick(event) {
    this.props.onSelect(this.props.info.keyValue);
  }

  render() {
    let { row, columns, info, enableSelection, ifSelected } = this.props;

    return (
      <tr>
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
