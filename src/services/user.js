import request from '../utils/request';

export async function login(values) {
  return request('/api/user/login', {
    method: 'POST',
    data: values,
  })
}