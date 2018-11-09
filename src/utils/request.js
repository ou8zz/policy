import fetch from 'dva/fetch'
import formurlencoded from 'form-urlencoded'
import Cookies from 'universal-cookie'
import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
import _ from 'lodash'

function checkStatus(response) {
  if (response.status >= 200 && response.status <= 400) {
    return response
  }
  // else if (response !== 502 || response !== 404 || response !== 504) {
  //   return response
  // }
  const error = new Error(response.statusText)
  error.response = response
  console.error(error) // eslint-disable-line
  throw error
}

export default async function request(url, options) {
  const cookies = new Cookies()
  const token = cookies.get('access_token')
  // const token = currentUser && currentUser.token

  options.method = options.method || 'GET' // eslint-disable-line
  options.method = options.method.toUpperCase() // eslint-disable-line
  const requestOptions = {
    method: options.method,
  }

  const headers = new Headers()

  if (token) {
    headers.append('Authorization', `Bearer ${token}`) // 拼 token
  }

  let GetLike = false

  if (options.method === 'GET') {
    GetLike = true
  }

  let targetUrl = url
  if (GetLike && options.data) {
    targetUrl += `?${formurlencoded(options.data)}`
  } else {
    headers.append('Content-Type', 'application/json;charset=utf-8')
    requestOptions.body = JSON.stringify(options.data)
  }

  requestOptions.headers = headers
  const response = await fetch(targetUrl, requestOptions)

  // checkStatus(response)
  const text = await response.text()

  let data;
  if (!isEmpty(text)) {
    data = JSON.parse(text)
  }
  if (response.status < 200 || response.status >= 400) {
    const error = new Error(_.get(data, 'msg') || _.get(data, 'errmsg'))
    // error.response = response
    console.error(data) // eslint-disable-line
    throw error
    // return response
  }

  // const data = JSON.parse(text)
  // if (_.has(data, 'pagination')) {
  //   data.pagination = _.pick(data.pagination, ['current_page', 'total'])
  //   data.pagination.current = data.pagination.current_page
  //   delete data.pagination.current_page
  // }

  const ret = cloneDeep(data)

  if (response.headers.get('x-total-count')) {
    ret.headers['x-total-count'] = response.headers.get('x-total-count')
  }

  return ret
}
