import React, { Component } from 'react';
import { setClass } from 'rs-util';
import GridHead from './grid/gridhead.js';
import GridBody from './grid/gridbody.js';
import NavHeader from './nav/navheader.js';
import NavFooter from './nav/navfooter.js';

export default class Grid extends Component {
  static propTypes = {
    columns: React.PropTypes.array, // 单元格定义
    rows: React.PropTypes.object, // 行特殊定义
    dataList: React.PropTypes.array,  // 数据
    pages: React.PropTypes.oneOfType([
        React.PropTypes.object,
        React.PropTypes.bool
    ]),  // 分页相关设定
    hasFooter: React.PropTypes.bool,
    renderKey: React.PropTypes.string,  // grid数据默认采用的key
    selection: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.bool,
    ]), // 全选相关功能
    enableFilter: React.PropTypes.bool, // 数据过滤相关功能
    myTableStyle: React.PropTypes.array,  // 内置风格
    myHeadStyle: React.PropTypes.string,  // 内置头部风格
    className: React.PropTypes.string,  // 自定义类名
    divStyle: React.PropTypes.object, // 彻底自定义样式
    prefixName: React.PropTypes.string // 前缀
  }

  static defaultProps = {
    columns: [],
    rows: {},
    dataList: [],
    pages: false,
    hasFooter: true,
    renderKey: 'id',
    selection: false,
    enableFilter: false,
    myTableStyle: ['bordered'],   // triped, condensed
    myHeadStyle: 'active',    // active, success, info, warning, danger
    className: 'table-responsive',
    divStyle: {},
    prefixName: 'salt'
  }

  _createState(props) {
    return {
      selectAll: false,
      selected: props.selection ? [] : false,
      filter: {
        label: '',
        value: ''
      },
      data: props.dataList.slice(),
      orderFunc: false
    }
  }

  state = this._createState(this.props)

  // 接收新数据
  componentWillReceiveProps(nextProps) {
    this.setState(this._createState(nextProps));
  }

  // 选中处理
  _handleSelect(value) {
    let { selectAll, selected, data } = this.state;
    let { renderKey } = this.props;
    if (value === '-1') {
      selectAll = !selectAll;
      if (selectAll) {
        selected = data.map((item, index) => {
          return item[renderKey] !== undefined ? item[renderKey] : index;
        });
      } else {
        selected = [];
      }
    } else {
      let index = selected.indexOf(value);
      if (index < 0) {
        selected.push(value);
      } else {
        selected.splice(index, 1);
      }
      selecteAll = selected.length === data.length && selected.length !== 0;
    }
    this.setState({
      selectAll: selectAll,
      selected: selected
    });
  }

  // 分页处理
  // 对外输出offset
  _updatePage(offset) {
    this.props.rerender(offset * this.props.pages.limit);
  }

  // 筛选处理
  _updateFilter(value, key) {
    let { dataList, columns } = this.props;
    let { filter } = this.state;
    filter[key] = value;
    let data = this._filterData(filter, dataList, columns);

    this.setState({
      selectAll: false,
      selected: [],
      filter: filter,
      data: data
    });
  }

  // 过滤数据
  _filterData(filter, data, thead) {
    if (filter.value === '') {
      return data.slice();
    }

    let self = this;
    if (filter.label === '') {
      // 针对所有数据进行过滤
      return data.filter((line) => {
        return thead.some((column) => {
          // 对每一行数据的每一列进行过滤
          return self._checkTd(filter.value, line[column.name], column.renderer);
        });
      });
    } else {
      // 针对某一列数据进行过滤
      return data.filter((line) => {
        let renderer, name;
        for (let i = thead.length - 1; i >= 0; i --) {
          if (filter.label === thead[i].label) {
            name = thead[i].name;
            renderer = thead[i].renderer;
            break;
          }
        }
        return self._checkTd(filter.value, line[name], renderer);
      });
    }
  }

  // 判断单元格的筛选
  _checkTd(value, tdValue, renderer) {
    tdValue = renderer ? renderer(tdValue) : tdValue;
    // 此处默认以字符串格式对内容进行对比
    // TODO: 此处需要更优解
    if (tdValue === undefined || tdValue.toString().indexOf(value) < 0) {
      return false;
    }
    return true;
  }

  // 排序相关内容更新
  _updateOrder(orderFunc) {
    this.setState({
      orderFunc: orderFunc
    });
  }

  render() {
    let { columns, rows, dataList, pages, hasFooter, renderKey, selection, enableFilter, myTableStyle, myHeadStyle, className, divStyle, prefixName } = this.props;
    let { filter, data, selectAll, selected, orderFunc } = this.state;
    let tableClassName = setClass(
        `${prefixName}-table`,
        `${prefixName}-table-hover`,
        myTableStyle.map((item) => `${prefixName}-table-${item}`),
        className
      );

    let orderedData = data.slice();
    if (orderFunc) {
      // 使用某一列进行排序的情况下调用
      orderedData.sort((prev, next) => {
        // 调用外部定义的func
        let order = orderFunc.func(prev[orderFunc.key], next[orderFunc.key]);
        // 可以设定正向和反向排序
        return orderFunc.forward ? order : !order;
      });
    }

    return (
      <div style={divStyle}>
        {
          (enableFilter || selection) &&
          <NavHeader
            prefixName={prefixName}
            enableFilter={enableFilter}
            filter={filter}
            updateFilter={this::this._updateFilter}
            columns={columns}
            selected={selected}
            batch={selection}
          />
        }
        <table className={tableClassName}>
          <GridHead
            columns={columns}
            myStyle={myHeadStyle}
            orderFunc={orderFunc}
            updateOrder={this::this._updateOrder}
            selected={selected}
            selectAll={selectAll}
            onSelect={this::this._handleSelect}
          />
          <GridBody
            dataList={orderedData}
            columns={columns}
            rows={rows}
            renderKey={renderKey}
            selected={selected}
            onSelect={this::this._handleSelect}
          />
        </table>
        { (pages || hasFooter) &&
          <NavFooter
            prefixName={prefixName}
            update={this::this._updatePage}
            number={dataList.length}
            pages={pages}
          />
        }
      </div>
    );
  }
};
