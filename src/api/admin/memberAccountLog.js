import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/admin/memberAccountLog/page',
    method: 'post',
    data: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/memberAccountLog',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/memberAccountLog/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/memberAccountLog/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/memberAccountLog',
    method: 'put',
    data: obj
  })
}
