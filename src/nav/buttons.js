import React, { Component } from 'react';

export default class Buttons extends Component {
  static propTypes = {
    prefixName: React.PropTypes.string,
    batch: React.PropTypes.array,
    selected: React.PropTypes.array
  }

  static defaultProps = {
    prefixName: 'cat',
    batch: [],
    selected: []
  }

  render() {
    let { prefixName, batch, selected } = this.props;

    return (
      <ul className={`${prefixName}-table-headernote nav navbar-nav pull-right`}>
        {
          batch.map((item, index) => {
            return (
              <li key={index}>
                <button className={`btn btn-${item.myStyle ? item.myStyle : 'default'} btn-xs`} onClick={item.onClick.bind(null, selected)}>
                  { item.name ? item.name : <i className={item.icon}/> }
                </button>
              </li>
            );
          })
        }
      </ul>
    )
  }
}
