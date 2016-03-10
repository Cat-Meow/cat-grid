# React Salt - Grid

## 功能

* 展示行列数据
* 单元格数据格式化
* 增、删、查、改
* 分页
* 全选
* 排序
* 额外信息展示


## Tips

* If u do not need Pagination, just prevent 'offset\limit\total'
* When using 'renderer', Grid will offer u current value in td, current line Data, info about this td


## API

Props属性如下

props | 说明 | 类型 | 默认值 | 备选 
------------ |--------------- | ------------- | ------------- | -------------
columns | 列的定义 | array | [] |
rows | 数据列表 | array | [] |
offset | 分页码、不设置相关属性则不会产生分页组件 | number | -1 |
total | 总页数 | number | 0 |
limit | 每页数量 | number | 20 |
renderKey | key，需要自定义绑定到一个key，如果数据没有唯一的key，将会自定采用index | string |
enableSelection | 使用全选功能 | boolean | false |
className | 自定义容器的类名 | string | table-responsive |
heightControl | 高度限制 | string | ‘’ |
TableStyle | 表格风格 | array | ['bordered'] | bordered\triped\condensed
myHeadStyle | 表格头风格 | string | active | active\success\info\warning\danger
batch | 自定义绑定多选功能的按钮 | array | [] |

* 每一行都可以单独设定divStyle、className, className可以直接传递字符串
* 每一单元格可以单独设定divStyle、className、orderBy、renderer

* 行的回调参数是line info
* 单元格的回调参数分别是value line info
