import axios from './config'

// 获取验证码
export async function getCaptcha(): Promise<any> {
  return await axios.get('api/login/captcha')
}

// 登录
export async function login(data:any): Promise<any> {
  const { autoLogin, username, password, type } = data

  return await axios.post('/api/login/account', {
    autoLogin, username, password, type
  })
}

