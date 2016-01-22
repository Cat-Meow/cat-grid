import React, {Component} from 'react';
import _ from 'lodash';
import GridRow from './gridrow.js';

class GridBody extends Component {
  static propTypes = {
    dataList: React.PropTypes.array,
    columns: React.PropTypes.array,
    rows: React.PropTypes.array,
    renderKey: React.PropTypes.string,

    enableSelection: React.PropTypes.bool,
    selectAll: React.PropTypes.bool,
    onSelect: React.PropTypes.func
  }

  static defaultProps = {
    dataList: [],
    columns: [],
    rows: [],
    renderKey: 'id',
    enableSelection: false,
    selectAll: false,
  }

  render () {
    let { rows, columns, renderKey, dataList, enableSelection, selected, onSelect } = this.props;

    return (
      <tbody>
      {
        dataList.map(function(line, index) {
          let key = line[renderKey] !== undefined ? line[renderKey] : index;
          let ifSelected = _.indexOf(selected, key) > -1;

          return (
            <GridRow
              key={`grid-tr-${key}`}
              row={line}
              columns={columns}
              info={{rowIndex: index, keyValue: key}}
              enableSelection={enableSelection}
              ifSelected={ifSelected}
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
