import React, { Component } from 'react';
import Filter from './filter.js';
import Buttons from './buttons.js';

export default class NavHeader extends Component {
  static propTypes = {
    prefixName: React.PropTypes.string,
    enableFilter: React.PropTypes.bool,
    filterName: React.PropTypes.object,
    updateFilter: React.PropTypes.func,
    columns: React.PropTypes.array,

    selected: React.PropTypes.array,
    enableSelection: React.PropTypes.bool,


    batch: React.PropTypes.array
  }

  static defaultProps = {
    prefixName: 'cat',
    enableFilter: false,
    filterName: {},
    columns: [],

    enableSelection: false,
    selected: [],


    batch: []
  }

  render() {
    let { prefixName, enableFilter, filterName, updateFilter, columns, enableSelection, batch, selected } = this.props;

    return (
      <nav className={`${prefixName}-table-header clearfix`}>
        {
          enableFilter &&
          <Filter
            columns={columns}
            prefixName={prefixName}
            filterName={filterName}
            updateFilter={updateFilter}
          />
        }
        {
          enableSelection &&
          <Buttons
            prefixName={prefixName}
            batch={batch}
            selected={selected}
          />
        }
      </nav>        
    )
  }
}
