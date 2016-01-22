import React, { Component } from 'react';
import Filter from './filter.js';
import Buttons from './buttons.js';

export default class NavHeader extends Component {
  static propTypes = {
    prefixName: React.PropTypes.string,
    enableFilter: React.PropTypes.bool,
    filter: React.PropTypes.object,
    updateFilter: React.PropTypes.func,
    columns: React.PropTypes.array,
    selected: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.bool
    ]),
    batch: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.bool
    ])
  }

  static defaultProps = {
    prefixName: 'cat',
    enableFilter: false,
    filter: {},
    columns: [],
    selected: false,
    batch: false
  }

  render() {
    let { prefixName, enableFilter, filter, updateFilter, columns, selected, batch } = this.props;

    return (
      <nav className={`${prefixName}-table-header clearfix`}>
        {
          enableFilter &&
          <Filter
            columns={columns}
            prefixName={prefixName}
            filter={filter}
            updateFilter={updateFilter}
          />
        }
        {
          batch &&
          <Buttons
            prefixName={prefixName}
            selected={selected}
            batch={batch}
          />
        }
      </nav>        
    )
  }
}
