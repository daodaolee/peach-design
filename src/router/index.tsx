import React, { ReactElement } from 'react'
import { useRoutes, RouteObject, Navigate } from 'react-router-dom'

import Home from '@/views/Home'
import Login from '@/views/Login'
import List from '@/views/List'
import Other from '@/views/Other'

const routes:RouteObject[] = [{
  path: '/',
  element: <Home />,
  children: [{
    path: '',
    element: <Navigate to='list'/>
  }, {
    path: 'list',
    element: <List />
  }, {
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
