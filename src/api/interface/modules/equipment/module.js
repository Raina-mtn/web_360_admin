import request from '@/api/baseHttp/index.js'
// 获取模块状态
export const getModuleList = (data) => request({
  url: '/device/module/list',
  method: 'post',
  data
}).then(res => {
  return res
})

// 获取模块状态
export const setDevicePower = (data) => request({
  url: '/device/power',
  method: 'post',
  data
})