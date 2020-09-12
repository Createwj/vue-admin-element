import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/admin/order/page',
    method: 'post',
    data: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/order',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/order/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/order/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/order',
    method: 'put',
    data: obj
  })
}
