import request from '@/api/baseHttp/index.js'
//故障详情列表
export const apiGetDefectList = (data) => request({
  url: '/defect/list-detail',
  method: 'post',
  data
})
//车厢号
export const apiGetPlateNumber = (data) => request({
  url: '/vehicle-model/plateNumber',
  method: 'post',
  data
})
//车体号
export const apiGetPlateNum = (data) => request({
  url: '/vehicle/list',
  method: 'post',
  data
})
//任务名称
export const apiGetTaskList = (data) => request({
  url: '/task/list',
  method: 'post',
  data
})
//部件
export const apiGetPartskList = (data) => request({
  url: '/parts/list',
  method: 'post',
  data
})

//创建
export const apiVehicleCreate = (data) => request({
  url: '/vehicle/create',
  method: 'post',
  data
})



