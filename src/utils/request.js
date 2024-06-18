import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user.js'

// 导出基准地址备用
export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net'
// 创建axios实例
const httpInstance = axios.create({
  baseURL,
  timeout: 5000
})
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 通过状态管理pinia获取用户登录信息，如果本地有token就在请求头携带
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  ElMessage({
    type: 'error',
    message: e.response.data.message
  })
  return Promise.reject(e)
})

export default (url, method, submitData) => httpInstance(
  {
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  }
)