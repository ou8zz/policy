import request from './request';

export async function login(loginTmpCode) {
  return await request({
    url: `/api/auth/dingding/login-tmp-code/${loginTmpCode}`,
    method: 'get',
  })
}
