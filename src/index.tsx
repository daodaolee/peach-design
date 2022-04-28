import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/assets/css/common.less'
import RouteConfig from '@/router/index'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/rtk'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <RouteConfig />
    </BrowserRouter>
  </Provider>
)
