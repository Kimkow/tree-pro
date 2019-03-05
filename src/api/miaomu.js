import request from '../utils/request'

export function getMenu(params) {
  return request({
    url: '/menu/tree',
    method: 'get',
    params
  })
}