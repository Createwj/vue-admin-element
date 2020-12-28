import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/admin/activity/page',
    method: 'post',
    data: query
  })
}

export function interpage(query) {
  return request({
    url: '/admin/apply/page',
    method: 'post',
    data: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/activity',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/activity/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/activity/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/activity',
    method: 'put',
    data: obj
  })
}
