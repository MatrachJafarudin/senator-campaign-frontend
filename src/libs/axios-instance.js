import axios from 'axios'
import { getCookie } from './utils'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  Accept: '*/*',
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getCookie('accessToken')
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  if (!config.url.includes('/api/')) {
    config.url = config.url.replace(/^\/|\/$/g, '')
    config.url = `/api/${config.url}`
  }
  return config
})

export default axiosInstance
