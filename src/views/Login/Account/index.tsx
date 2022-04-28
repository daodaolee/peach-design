import React from 'react';
import { Form, Input } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons';

function LoginAccount(prop:any){
   const usernameValidator = (_:any, value:any) => {
    if (!value){
       return Promise.reject('请输入账号！');
    } else {
      return Promise.resolve()
    }
  },
   onPressEnter = () => prop.onPressEnter
  return (
    <>
      <Form.Item
        name="username"
        rules={[{ validator: usernameValidator }]}
      >
        <Input
          className='w100'
          prefix={<UserOutlined />}
          size="large"
          placeholder='账号：admin or user'
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password
          className='w100'
          prefix={<LockOutlined />}
          size="large" 
          placeholder='密码：ant.design'
          onPressEnter={onPressEnter}
        />
      </Form.Item>
    </>
  )
}
export default LoginAccount