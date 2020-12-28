import request from '@/utils/request'
// 查询参加过的活动
export function page(query) {
  return request({
    url: '/admin/apply/page',
    method: 'post',
    data: query
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/apply',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/apply/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/apply/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/apply',
    method: 'put',
    data: obj
  })
}
