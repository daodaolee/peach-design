import { configureStore } from '@reduxjs/toolkit'
import { menuReducer } from '@/rtk'

export * from '@/rtk/modules/menu'

export const store = configureStore({
  reducer: {
    menu: menuReducer
  }
})