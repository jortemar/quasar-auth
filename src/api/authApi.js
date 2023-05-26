import axios from 'axios'
import { Cookies } from "quasar";

const authApi = axios.create({
  baseURL: 'http://api-login.com/api/auth'
})

authApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${Cookies.get('token')}`

  return config
})

export default authApi
