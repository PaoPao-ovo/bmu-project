import axios from 'axios'

const baseURL = 'http://192.168.0.102:5002'
const timeout = 10000

const request = axios.create({
  baseURL,
  timeout
})

request.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => Promise.reject(err)
)

request.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default request
