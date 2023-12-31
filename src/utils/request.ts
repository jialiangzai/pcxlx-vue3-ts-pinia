import axios from 'axios'
import stores from '@/stores/counter'

export const request = axios.create({
  baseURL: '/api',
})
// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    let useStore = stores()
    if (useStore.token) {
      config.headers['Authorization'] = useStore.token
    }
    // 在发送请求之前做些什么
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  async (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if (response.data.code === '403') {
      // // 暂时手动更新一下
      // let useStore = stores()
      // await useStore.getUserInfo()
    }
    return response.data
  },
  (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
