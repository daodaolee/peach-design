import React from 'react'
import * as Icon from '@ant-design/icons'

export const AntdIcon = (name: string) => 
  React.createElement(Icon && (Icon as any)[name], {
    style: { fontSize: '16px' }
  })