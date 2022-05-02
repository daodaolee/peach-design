import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
const baseURL = ''

const axios:AxiosInstance = Axios.create({
  baseURL,
  timeout: 20000
})
axios.defaults.withCredentials = true

axios.interceptors.request.use((response:AxiosRequestConfig) => {
  return response
}, err => {
  return Promise.reject(err)
})

axios.interceptors.response.use((response:AxiosResponse) => {
  return response.data
}, err => {
  return Promise.reject(err)
})

export default axios

// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// class Request {
//   instance: AxiosInstance
//   constructor(config: AxiosRequestConfig){
//     this.instance = axios.create(config)
//     this.instance.interceptors.request.use((res: AxiosRequestConfig) => {
//       console.log('全局请求拦截器')
//       return res
//     }, (err:any) => err)
//     this.instance.interceptors.response.use((res:AxiosResponse) => {
//       console.log('全局响应拦截器')
//       return res.data
//     }, (err:any) => err)
//   }
//   request(config: AxiosRequestConfig){
//     return this.instance.request(config)
//   }
// }

// export default Request