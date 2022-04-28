import React, { ReactElement } from 'react'
import { useRoutes, RouteObject } from 'react-router-dom'

import Home from '@/views/Home'
import Login from '@/views/Login'
import List from '@/views/List'
import Other from '@/views/Other'

const routes:RouteObject[] = [{
  path: '/',
  element: <Home />,
  children: [{
    path: 'list',
    element: <List />
  },{
    path: 'other',
    element: <Other />
  }]
}, {
  path: '/login',
  element: <Login />
}]

export default function RouteConfig ():ReactElement {
  const element = useRoutes(routes)
  return (
    <>
      { element }
    </>
  )
}
