import request from '@/api/baseHttp/index.js'
// 组织机构列表
export const apiGetOrgList = (data) => request({
  url: '/organization/organization/list',
  method: 'post',
  data
}).then(res => {
  return res
})
// 组织机构树
export const apiGetOrgTree = (data) => request({
  url: '/organization/organization/tree',
  method: 'post',
  data
}).then(res => {
  return res
})
// 删除
export const apiDelOrg = (data) => request({
  url: '/organization/organization/delete',
  method: 'post',
  data
}).then(res => {
  return res
})

// 创建
export const apiCreateOrg = (data) => request({
  url: '/organization/organization/create',
  method: 'post',
  data
}).then(res => {
  return res
})

// 编辑
export const apiUpdateOrg = (data) => request({
  url: '/organization/organization/update',
  method: 'post',
  data
}).then(res => {
  return res
})