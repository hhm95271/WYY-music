import axios from 'axios'
import qs from 'qs'
axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.request.use(function (config) {
  var token = sessionStorage.getItem('my-token')

  if (token && config.meth === 'post' && (config.data instanceof FormData)) {
    config.headers = { 'Content-Type': 'application/x-www-form-urlencoded', }
    config.data = qs.stringify(config.data, { arrayFormat: 'repeat' })
    if (token) {
      config.headers['Authorization'] = token
    }
  }
  return config
}), function (err) {
  return Promise.reject(err)
}

export default axios


