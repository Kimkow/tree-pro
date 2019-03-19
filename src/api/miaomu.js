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
export function postData(data) {
  return request({
    url: '/message',
    method: 'post',
    data
  })
}
export function getAllList(params) {
  return request({
    url: '/index/list',
    method: 'get',
    params
  })
}
