import React, { Component } from 'react';
import Pagination from 'rs-pagination';

export default class NavFooter extends Component {
  static propTypes = {
    prefixName: React.PropTypes.string,
    update: React.PropTypes.func,
    number: React.PropTypes.number,
    pages: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.bool
    ])
  }

  static defaultProps = {
    prefixName: 'salt',
    number: 0,
    pages: {}
  }

  _updatePage(newPage) {
    this.props.update(newPage);
  }

  render() {
    let { prefixName, number, pages } = this.props;
    let { offset, current, total, totalPage, limit, paginationStyle='omitted' } = pages;

    totalPage = totalPage ? totalPage : ((total && limit) ? Math.ceil(total / limit) : -1);
    current = current ? current : ((offset !== undefined && limit) ? Math.floor(offset/limit) : -1);

    return (
      <nav className={`${prefixName}-table-footer clearfix`}>
        <div className={`${prefixName}-table-footnote pull-left`}>
          {
            (total !== undefined || number !== 0) &&
            <span>{total !== undefined ? `共${total}` : `本页共${number}` }条数据  </span>
          }
          {
            number !== 0 && offset !== undefined &&
            <span>当前显示{offset + 1}-{offset + number}条</span>
          }
        </div>
        {
          current !== -1 &&
          <Pagination
            offset={current}
            totalPage={totalPage}
            myStyle={paginationStyle}
            update={this::this._updatePage}
            className="pull-right"
            mySize="small"
          />
        }
      </nav>
    )
  }
}
