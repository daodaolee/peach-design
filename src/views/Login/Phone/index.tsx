import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Input, Button, message } from 'antd';

import { MobileOutlined, LockOutlined } from '@ant-design/icons';
import { getCaptcha } from '@/axios'

function LoginMobile(prop:any){
  let timer:ReturnType<typeof setTimeout>
  const [count, setCount] = useState(10),
  // 当前按钮的状态，true：禁用，false：启用
    [codeState, setCodeState] = useState(false),
    [captchaLoading, setCaptchaLoading] = useState(false),
   [captchaCodeDisabled, setCaptchaCodeDisabled] = useState(false),
   getCaptchaAPI = async () => {
    setCaptchaLoading(true)
    const result = await getCaptcha()
    setCaptchaLoading(false)
    if (!result){
      return false
    } else {
      message.success('验证码发送成功')
      return true
    }
    
   },
   handleCaptcha = async () => {
      const result = await getCaptchaAPI()
      if (!result){
        return
      }
      setCodeState(true)
      setCaptchaCodeDisabled(true)
      timer = setInterval(() => {
        setCount(value => value -= 1)
      }, 1000)
    },
    // 验证手机
     mobileValidator = (_:any, value:any) => {
      if (!value){
         return Promise.reject('请输入手机号！');
      } else if (!/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(value)){
          return Promise.reject('手机号格式错误')
      } else {
        return Promise.resolve()
      }
    },
    // 验证验证码
    captchaValidator = (_:any, value:any) => {
      if (!value){
         return Promise.reject('请输入验证码！');
      } else {
        return Promise.resolve()
      }
    },
    onPressEnter = () => prop.onPressEnter


    useEffect(() => {
      if (count <= 0){
        clearInterval(timer)
        setCodeState(false)
        setCaptchaCodeDisabled(false)
      }
    })
  
  return (
    <>
      <Form.Item
        name="mobile"
        rules={[{ validator: mobileValidator }]}
      >
        <Input 
          className='w100'
          autoComplete="off"
          prefix={<MobileOutlined />}
          size="large"
          placeholder='请输入手机号' 
        /> 
      </Form.Item>

      <Form.Item>
        <Row style={{ justifyContent: 'space-between' }}>
          <Col style={{ flex: '1' }}>
            <Form.Item
              name='captcha' 
              noStyle 
              rules={[{ validator: captchaValidator }]}
            >
              <Input 
                autoComplete="off"
                prefix={<LockOutlined />}
                size="large"
                placeholder='请输入验证码'
                onPressEnter={onPressEnter}
              />
            </Form.Item>
          </Col>
          <Col style={{ textAlign: 'right', marginLeft: '16px' }}>
            <Button
              size='large'
              disabled={captchaCodeDisabled}
              onClick={handleCaptcha}
              loading={captchaLoading}
            >
              {!codeState ? '获取验证码' : count + 's后获取'}
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </>
  )
}
export default LoginMobile