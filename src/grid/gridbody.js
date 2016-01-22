import React, {Component} from 'react';
import GridRow from './gridrow.js';

class GridBody extends Component {
  static propTypes = {
    dataList: React.PropTypes.array,
    columns: React.PropTypes.array,
    rows: React.PropTypes.array,
    renderKey: React.PropTypes.string,
    selected: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
    ]),
    onSelect: React.PropTypes.func
  }

  static defaultProps = {
    dataList: [],
    columns: [],
    rows: [],
    renderKey: 'id',
    selected: false
  }

  render () {
    let { rows, columns, renderKey, dataList, selected, onSelect } = this.props;

    return (
      <tbody>
        {
          dataList.map(function(line, index) {
            let key = line[renderKey] !== undefined ? line[renderKey] : index;

            return (
              <GridRow
                key={`grid-tr-${key}`}
                row={line}
                columns={columns}
                info={{rowIndex: index, keyValue: key}}
                enableSelection={selected ? true : false}
                ifSelected={selected ? selected.indexOf(key) > -1 : false}
                onSelect={onSelect}
              />
            );
          })
        }
      </tbody>
    );
  }
};

export default GridBody;
