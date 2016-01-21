import React, { Component } from 'react';
import Grid from '../src/grid.js';
import '../assets/index.less';

export default class Example extends Component {
  state = {
    dataList: []
  }

  _configPrepare() {
    return [
      { label: '#', name: 'id'},
      { label: '影片名', name:'nm', className: 'col-red' },
      { label: '上映日期', name: 'ct' },
      { label: '人数', name: 'number' },
      { label: '有效', name: 'active' },
      { label: '操作',
          renderer: (content, line, info) => {
            return '';
        }
      }
    ];
  }

  _changeData() {
    let time = new Date(),
      minute = time.getSeconds(),
      dataList = [],
      listNum = 0;

    while (listNum ++ <= 10) {
      dataList.push({
        id: `id-${listNum}-${minute}`,
        nm: '道士下山',
        number: 100,
        active: listNum % 2 === 0 ? true : false,
        ct: time
      });
    }
    this.setState({
      dataList: dataList
    });
  }

  render() {
    const headList = this._configPrepare();
    let { dataList} = this.state;

    return (
      <div>
        <button className="btn btn-primary" onClick={this::this._changeData}>
          更新数据
        </button>
        <Grid
          columns={headList}
          dataList={dataList}
        />
      </div>
    );
  }
}
