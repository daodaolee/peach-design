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
type MenuParams = {
  children: MenuParams[];
  label: boolean | React.ReactChild | React.ReactFragment | null | undefined;
  key: React.Key; icon: string;
}
type BreadcrumbParams = {
  label: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined;
}


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
  renderMenu = (data: any[], params = []) => {
    const result = []
    data.map((item:MenuParams) => {
      if (item.children && item.children.length){
        renderMenu(item.children, result)
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
  toggleCollapsed = (value: boolean) => setCollapsed(value),
  menuData = useSelector(getMenu),
  navigate = useNavigate(),
  location = useLocation(),
  // 菜单点击跳转
   handleMenuClick = (data: { key: string; }) => {
    const result = deepFindByOnce(menuData, 'key', data.key)
    navigate(result.path)
    setSelectedKeys(result.key)
  },
  // 加载面包屑
  renderBreadcrumb = () => {
    const result = deepFindByChain(menuData, 'path', location.pathname)
    return result && result.map((item:BreadcrumbParams, index: React.Key) => 
      item && <Breadcrumb.Item key={index}>{item.label}</Breadcrumb.Item>)
  },
  // 菜单切换，高亮
  handleOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1);
    const rootSubmenuKeys = menuData.map((item: { key: string }) => item.key)
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }
  useEffect(() => {
    // 刷新页面，菜单高亮
    const result = deepFindByChain(menuData, 'path', location.pathname)
    if (!result){
      return
    }
    setSelectedKeys([result[result.length - 1].key])
    setOpenKeys(result.length > 1 ? result.map((item: { key: string }) => item.key) : [])
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
        <Footer style={{ textAlign: 'center' }}>Peach Design ©2022 Created by DaoDaoLee</Footer>
      </Layout>
    </Layout>
  )
}
export default Home
