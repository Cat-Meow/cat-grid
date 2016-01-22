import React, { Component } from 'react';

export default class Filter extends Component {
  static propTypes = {
    prefixName: React.PropTypes.string,
    filterName: React.PropTypes.object,
    columns: React.PropTypes.array,
    updateFilter: React.PropTypes.func
  }

  static defaultProps = {
    prefixName: 'cat',
    filterName: {
      label: '',
      value: ''
    },
    columns: []
  }

  state = {
    open: false
  }

  _handleInputChange(event) {
    this.props.updateFilter(event.target.value, 'value');
  }

  _handleFilterClick() {
    this.setState({
      open: !this.state.open
    });
  }

  _handleFilterChoose(event) {
    event.preventDefault();
    this.props.updateFilter(event.target.name, 'label');
    this._handleFilterClick();
  }

  render() {
    let { prefixName, filterName, columns } = this.props;
    let { open } = this.state;
    let self = this;

    let index = -1;
    for (let i = columns.length - 1; i >= 0; i --) {
      if (columns[i].label === filterName.label) {
        index = i;
      }
    }
    let dropButtonLabel = index < 0 ? '全部' : columns[index].label;

    return (
      <div className={`${prefixName}-table-headernote pull-left`}>
        <input type="text" className="form-control" placeholder="筛选"
          value={filterName.value}
          onChange={this::this._handleInputChange}
        />
        <div className='dropdown open'>
          <button className="btn btn-default dropdown-toggle" type="button" onClick={this::this._handleFilterClick}>
            {dropButtonLabel}
            <span className="caret"/>
          </button>

          <ul className="dropdown-menu" style={{display: open ? 'block' : 'none'}}>
            <li className={filterName.label === '' ? 'active' : ''}>
              <a href="#" label="" onClick={this::this._handleFilterChoose}>
                全部
              </a>
            </li>
            <li role="separator" className="divider"/>
            {
              columns
                .filter((item) => {
                  return !!item.name;
                })
                .map((item) => {
                  return (
                    <li key={item.label} className={filterName.label === item.label ? 'active' : ''}>
                      <a href="#" name={item.label} onClick={self::self._handleFilterChoose}>
                        {item.label}
                      </a>
                    </li>
                  );
                })
            }
          </ul>
        </div>
      </div>
    );
  }
}

