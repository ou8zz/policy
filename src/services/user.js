import request from '../utils/request';

export async function login(loginTmpCode) {
  console.log("aaaaaaaa", loginTmpCode)
  return await request({
    url: `/api/auth/dingding/login-tmp-code/${loginTmpCode}`,
    method: 'get',
  })
}
