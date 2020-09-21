import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/admin/memberAccount/page',
    method: 'post',
    data: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/memberAccount',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/memberAccount/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/memberAccount/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/memberAccount',
    method: 'put',
    data: obj
  })
}

export function editScore(obj) {
  return request({
    url: '/admin/memberAccount/operateIntegral',
    method: 'post',
    data: obj
  })
}
