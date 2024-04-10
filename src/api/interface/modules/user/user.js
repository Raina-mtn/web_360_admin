import request from '@/api/baseHttp/index.js'
export const apiLogin = (data) => request({
  url: '/login',
  method: 'post',
  data
}).then(res => {
  return res
})
export const apiLogout = (data) => request({
  url: '/logout',
  method: 'post',
  data
}).then(res => {
  return res
})
export const apiUserInfo = (data) => request({
  url: '/user/base-info',
  method: 'post',
  data
}).then(res => {
  return res
})
// 列表
export const apiGetUserList = (data) => request({
  url: '/user/list',
  method: 'post',
  data
}).then(res => {
  return res
})
//创建用户
export const apiCreateUser = (data) => request({
  url: '/user/create',
  method: 'post',
  data
}).then(res => {
  return res
})
//删除用户
export const apiDelUser = (data) => request({
  url: '/user/delete',
  method: 'post',
  data
}).then(res => {
  return res
})
//更新用户
export const apiUpdateUser = (data) => request({
  url: '/user/update',
  method: 'post',
  data
}).then(res => {
  return res
})
//重置密码
export const apiResetPass = (data) => request({
  url: '/user/reset-pass',
  method: 'post',
  data
}).then(res => {
  return res
})
//修改用户状态
export const apiUpdateUserStatus = (data) => request({
  url: '/user/update-status',
  method: 'post',
  data
}).then(res => {
  return res
})
//操作日志
export const apiGetLog = (data) => request({
  url: '/user/operate-log',
  method: 'post',
  data
}).then(res => {
  return res
})

//切换国际化语言
export const changeLocale = (data) => request({
  url: '/home/change-locale',
  method: 'post',
  data
}).then(res => {
  return res
})