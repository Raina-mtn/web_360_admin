import request from '@/api/baseHttp/index.js'
// 获取故障列表
export const getEquipmentList = (data) => request({
  url: '/device/exception/list',
  method: 'post',
  data
}).then(res => {
  return res
})
// 获取设备列表
export const getDeviceList = (data) => request({
  url: '/device/module/list',
  method: 'post',
  data,
}).then(res => {
  return res
})