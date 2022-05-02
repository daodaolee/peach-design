import React from 'react';
import './index.less'

function TableOperation(prop:any){
  return (
    <div className='table-operation'>
      <div className='table-operation-form'>
        {prop.form()}
      </div>
      <div className='table-operation-table'>
        {prop.table()}
      </div>
    </div>
  )
}
export default TableOperation