import request from '../utils/request'

export function getMenu(params) {
  return request({
    url: '/menu/tree',
    method: 'get',
    params
  })
}
export function getList(params) {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}
export function getInfo(params) {
  return request({
    url: '/article/info',
    method: 'get',
    params
  })
}