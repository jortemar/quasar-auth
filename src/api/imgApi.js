import axios from 'axios'
import { Cookies } from "quasar";

const imgApi = axios.create({
  baseURL: 'http://api-login.com/api/auth'
})

imgApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get('token')}`
  config.headers['Content-Type'] = 'multipart/form-data'

  return config
})

export default imgApi
