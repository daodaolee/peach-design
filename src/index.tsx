import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/assets/css/common.less'
import RouteConfig from '@/router/index'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/rtk'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('en');


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <RouteConfig />
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
)
