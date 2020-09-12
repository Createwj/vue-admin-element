import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/admin/member/page',
    method: 'post',
    data: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/member',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/member/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/member/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/member',
    method: 'put',
    data: obj
  })
}
