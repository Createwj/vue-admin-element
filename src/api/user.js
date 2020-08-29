import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/member/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/admin/member/getInfo',
    method: 'get',
    params: { }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
