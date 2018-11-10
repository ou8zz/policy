import request from '../utils/request'

export async function getCheckVersion({ current, pageSize, ...params }) {
  return request('/api/check/version', {
    method: 'GET',
    data: params,
  })
}
export async function setCheckVersion(params) {
  return request('/api/check/version', {
    method: 'POST',
    data: params,
  })
}
export async function getAboutUs({ current, pageSize, ...params }) {
  return request('/api/about/us', {
    method: 'GET',
    data: params,
  })
}
export async function setAboutUs(params) {
  return request('/api/about/us', {
    method: 'POST',
    data: params,
  })
}
export async function getWhiteList({ current, ...other }) {
  return request('/api/users/whitelist', {
    method: 'GET',
    data: {
      pageNo: current,
      ...other,
    },
  })
}
export async function getMyColumn({ uid }) {
  return request(`/api/featured-column/my/${uid}`, {
    method: 'GET',
  })
}
export async function setMyColumn({ uid, ...params }) {
  return request(`/api/featured-column/my`, {
    method: 'POST',
    data: { ...params },
  })
}
export async function editMyColumn({ uid, ...params }) {
  return request(`/api/featured-column/my/${uid}`, {
    method: 'PUT',
    data: { ...params },
  })
}
export async function getProductList({ ...params }) {
  return request(`/api/featured-column/product/list`, {
    method: 'GET',
    data: { ...params },
  })
}
export async function getProcessReiewer() {
  return request(`/api/audit/process/reviewer`, {
    method: 'GET',
  })
}
export async function addProcessReiewer({ ...params }) {
  return request(`/api/audit/process/reviewer`, {
    method: 'POST',
    data: { ...params },
  })
}
export async function editProcessReiewer({ ...params }) {
  return request(`/api/audit/process/reviewer`, {
    method: 'PUT',
    data: { ...params },
  })
}
// 查询所有VIP栏目
export async function getFeaturedColumns() {
  return request('/api/featured-column/article/types', {
    method: 'GET',
  })
}
// 券商开关配置
export async function getBrokerSwitch() {
  return request('/api/stocks/broker/switch', {
    method: 'GET',
  })
}
// 券商开关配置
export async function setBrokerSwitch(params) {
  return request('/api/stocks/broker/switch', {
    method: 'PUT',
    data: params,
  })
}