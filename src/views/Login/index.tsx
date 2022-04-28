import React, { useState } from 'react';
import { Form, Tabs, Button, message } from 'antd';
import './index.less'
import logo from '@/assets/imgs/logo.svg'
import Account from './Account'
import Phone from './Phone'
import { login } from '@/axios'
import { useNavigate } from 'react-router-dom';

interface IParams {
  autoLogin: boolean;
  type: string;
  username?: string;
  password?: string;
  mobile?: string;
  captcha?: string;
}

function Login(){
  const navigate = useNavigate(),
  [tabKey, setTabKey] = useState('1'),
  [btnLoading, setBtnLoading] = useState(false),
   { TabPane } = Tabs,
    callback = (key: string) => setTabKey(key),
    tabData = [{
    key: '1',
    name: '账号密码登录'
  },
  {
    key: '2',
    name: '手机号登录'
  }],
  [form] = Form.useForm(),
  
  onFinish = async (values: IParams) => {
    const params:IParams = {
      autoLogin: true,
      type: tabKey === '1' ? 'account' : 'mobile'
    }
    if (tabKey === '1'){
      params['username'] = values.username
      params['password'] = values.password
    } else {
      params['mobile'] = values.mobile
      params['captcha'] = values.captcha
    }
    setBtnLoading(true)
    const result = await login(params)
    setBtnLoading(false)
    const { status } = result
    if (status === 'ok'){
      message.success('登录成功！')
      navigate('/')
    } else {
      message.error('账号密码错误！')
    }
  },
  onPressEnter = () => {
    const values = form.getFieldsValue()
    onFinish(values)
  }

  return (
    <div className='w100 h100 login'>
      <div className='login-main'>
        <div className='login-top'>
          <div className='login-top-header'>
            <span className='login-top-header-logo'>
              <img src={logo} />
            </span>
            <span className='login-top-header-title'>Peach Design</span>
          </div>
          <div className='login-top-desc'>Peach Design，你在想什么？你在想屁吃！</div>
        </div>
        <div className='login-container'>
          <Tabs activeKey={tabKey} onChange={callback}>
            {
              tabData.map(item => 
                <TabPane tab={item.name} key={item.key} />
              )
            }
          </Tabs>
          <Form
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            {
              tabKey === '1' ? <Account onPressEnter={onPressEnter}/> : <Phone onPressEnter={onPressEnter}/>
            }
            <Form.Item>
              <Button
                size='large'
                className='w100'
                type="primary" 
                htmlType="submit"
                loading={btnLoading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default Login