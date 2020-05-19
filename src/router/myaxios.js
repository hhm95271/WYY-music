import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(function (config) {
  if (config.meth === 'post' && (config.data instanceof FormData)) {
    config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
    config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
  }
  return config
}), function (err) {
  return Promise.reject(err)
}

export default axios


