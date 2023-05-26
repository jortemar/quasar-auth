import axios from 'axios'
import { LocalStorage } from "quasar";

const usersApi = axios.create({
  baseURL: 'http://api-login.com/api'
})


// los interceptores son una característica de axios
// cada vez que se realiza una petición, se detecta y se intercepta para colocarle el token como parámetro
usersApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${LocalStorage.getItem('token')}`
  // config.headers['Content-Type'] = 'multipart/form-data'

  return config
})

export default usersApi
