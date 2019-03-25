import axios from 'axios'
import qs from 'qs'

const service = axios.create({
  method: 'post',
  baseURL: process.env.BASE_API, // api 的 base_url
  // timeout: 15000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config; 
  },
  error => {
    // Do something with request error
    console.log(error + 'config') // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export function formDataPost(url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    service.post(url, data, config).then(response => {
      resolve(response)
    }).catch(err => {
      reject(err)
    })
  })
}

export default service

export function transformConfig(config) {
  config.transformRequest = [
    function(data) {
      data = qs.stringify(data)
      return data
    }]
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  return config
}
