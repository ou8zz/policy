import request from '../utils/request';

export async function login(params) {
  return request('/api/user/login', {
    method: 'POST',
    data: params,
  })
}

export async function logout(params) {
  return request('/api/user/logout', {
    method: 'POST',
    data: params,
  })
}

export async function register(params) {
  return request('/api/user/register', {
    method: 'POST',
    data: params,
  })
}