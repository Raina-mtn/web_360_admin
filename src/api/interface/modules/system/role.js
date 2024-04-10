import request from '@/api/baseHttp/index.js'
// 角色列表
export const apiGetRoleList = (data) => request({
  url: '/role/list',
  method: 'post',
  data
})
// 取所有角色平级
export const apiGetAllRoleList = (data) => request({
  url: '/role/list',
  method: 'post',
  data:{
    pageIndex: 1,
    pageSize: 100,
    ...data
  }
}).then(res => {
  return {data: res.data.list}
})
// 创建角色
export const apiCreateRole = (data) => request({
  url: '/role/create',
  method: 'post',
  data
}).then(res => {
  return res
})
// 删除角色
export const apiDelRole = (data) => request({
  url: '/role/delete',
  method: 'post',
  data
}).then(res => {
  return res
})
// 更新角色
export const apiUpdateRole = (data) => request({
  url: '/role/update',
  method: 'post',
  data
}).then(res => {
  return res
})