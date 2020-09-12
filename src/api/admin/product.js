import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/admin/product/page',
    method: 'post',
    data: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/product',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/product/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/product/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/product',
    method: 'put',
    data: obj
  })
}
