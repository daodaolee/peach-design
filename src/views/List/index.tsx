import React from 'react';
import TableOperation from '@/components/TableOperation'
import TableForm from '@/components/TableForm'
import TableSimple from '@/components/TableSimple'
import './index.less'

function List(){
  
  const getFormData = (value) => {
    console.log(value)
  },
  tableData = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }
  ]
  return (
    <div className='list'>
      <TableOperation
        form={() => <TableForm getFormData={getFormData} />}
        table={() => <TableSimple tableData={tableData}/>}
        getFormData={getFormData}
      />
    </div>
  )
}
export default List