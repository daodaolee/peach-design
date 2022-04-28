import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getMenu } from '@/rtk'
import { Layout, Menu, Breadcrumb, MenuProps } from 'antd';
import { deepFindByOnce, deepFindByChain } from '@/tools'
import { AntdIcon } from '@/components/Icon'
import logo from '@/assets/imgs/logo.svg'
import './index.less'


type MenuItem = Required<MenuProps>['items'][number];

const { Header, Content, Footer, Sider } = Layout,
 getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'):MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem;
  },

  // 渲染菜单
  renderMenu = (data, params = []) => {
    const result = []
    data.map(item => {
      if (item.children && item.children.length){
        renderMenu(item.children, result) as never
        params.push(getItem(item.label, item.key, item.icon ? AntdIcon(item.icon) : null, result) as never)
      } else {
        params.push(getItem(item.label, item.key, item.icon ? AntdIcon(item.icon) : null) as never)
      }
    })
    return params
  }


function Home () {
  const [collapsed, setCollapsed] = useState(false),
  [selectedKeys, setSelectedKeys] = useState(['']),
  [openKeys, setOpenKeys] = useState(['']),
  toggleCollapsed = value => setCollapsed(value),
  menuData = useSelector(getMenu),
  navigate = useNavigate(),
  location = useLocation(),
  // 菜单点击跳转
   handleMenuClick = data => {
    const result = deepFindByOnce(menuData, 'key', data.key)
    navigate(result.path)
    setSelectedKeys(result.key)
  },
  // 加载面包屑
  renderBreadcrumb = () => {
    const result = deepFindByChain(menuData, 'path', location.pathname)
    return result.map((item, index) => item && <Breadcrumb.Item key={index}>{item.label}</Breadcrumb.Item>)
  },
  // 菜单切换，高亮
  handleOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    const rootSubmenuKeys = menuData.map(item => item.key)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }
  useEffect(() => {
    // 刷新页面，菜单高亮
    const result = deepFindByChain(menuData, 'path', location.pathname)
    if (result.length > 1){
      setSelectedKeys([result[result.length - 1].key])
      setOpenKeys(result.map(item => item.key))
    } else {
      setSelectedKeys([result[result.length - 1].key])
      setOpenKeys([])
    }
  }, [])
 

  return (
    <Layout className='home' style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
        <div className="logo">
          <img src={logo} alt="" />
          {
            !collapsed ? <span>Peach Design</span> : ''
          }
        </div>
        <Menu
          theme="dark"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          mode="inline"
          items={renderMenu(menuData)}
          onClick={handleMenuClick}
          onOpenChange={handleOpenChange}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {
              renderBreadcrumb()
            }
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}
export default Home
