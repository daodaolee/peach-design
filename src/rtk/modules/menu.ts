import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  data: [{
    label: '列表页',
    key: '1',
    path: '/list',
    icon: 'GroupOutlined'
  },
  {
    label: '折叠页',
    key: '2',
    icon: 'FormatPainterOutlined',
    children: [{
      label: '其他',
      key: '2-1',
      icon: 'FormatPainterOutlined',
      children: [{
        label: '其他页',
        key: '2-2-1',
        path: '/other',
        icon: 'GroupOutlined'
      }]
    }]
  }
]
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenu: (state: any, action: any) => state.menu = action.payload
  }
})

export const { setMenu } = menuSlice.actions

export const getMenu = (state: any) => state.menu.data

export const menuReducer = menuSlice.reducer