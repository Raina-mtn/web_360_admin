import request from '@/api/baseHttp/index.js'
// 系统配置
export const apiGetSysSetting = (data) => request({
  url: '/system/get',
  method: 'post',
  data
}).then(res => {
  return res
})

export const apiUpdateSysSetting = (data) => request({
  url: '/system/update',
  method: 'post',
  data
}).then(res => {
  return res
})