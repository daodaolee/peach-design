import React from 'react';
import { Table } from 'antd'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  }
];
function TableSimple(prop){
  const { tableData } = prop
  return (
    <div className='table-simple'>
      <Table dataSource={tableData} columns={columns} />
    </div>
  )
}
export default TableSimple