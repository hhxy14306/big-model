// @ts-ignore
import axios from 'axios'
// @ts-ignore
import { message, Modal } from 'antd'

const { global_config } = window as any

const service = axios.create({
  baseURL: global_config.BASE_URL, // url = common-layout url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 1000 * 5, // request timeout
  headers: {
    'Content-Type': 'application/json;'
  }
})

// request interceptor
service.interceptors.request.use(
  (config: any) => {
    // if (store.token) {
    //   config.headers['Authorization'] = 'Bearer ' + store.token
    // } //ey

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    //
    // }
    console.log(config.url)
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    console.log(res)
    switch (res.code){
      case 200:
       default:
        return res;
      case 500:
        return message.error(res.message || 'Error')
      case "0000001":
        return Modal.error({
          title: '登录失效',
          content: '请重新登录！',
          onOk() {
              window.location.hash = '/login'
          }
        })
      case 2001:

    }
  },
  (error) => {
    if(error.response&&error.response.status==413){
      message.error( '文件过大！')
    }else{
      message.error(error.message || error.data.error || 'error')
    }
    //
    // message({
    //     message: error.message || error.data.message || 'error',
    //     type: 'error',
    //     duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

// @ts-ignore
export default service
