import request from '@/api/baseHttp/index.js'
import {exportExcel2} from '@/utils/util'

/*
线路数据
*/

// 线路列表
export const apiGetLineList = (data) => request({
  url: '/line/list',
  method: 'post',
  data
}).then(res => {
  return res
})
// 检测地点列表
export const apiGetPlaceList = (data) => request({
  url: '/place/list',
  method: 'post',
  data
}).then(res => {
  return res
})
// 新增检测地点
export const apiCreatePlace = (data) => request({
  url: '/place/create',
  method: 'post',
  data
}).then(res => {
  return res
})
//更新检测地点
export const apiUpdatePlace = (data) => request({
  url: '/place/update',
  method: 'post',
  data
}).then(res => {
  return res
})
// 删除检测地点
export const apiDeletePlace = (data) => request({
  url: '/place/delete',
  method: 'post',
  data
}).then(res => {
  return res
})

/*
车辆列表
*/

// 车辆列表
export const apiVehicleList = (data) => request({
  url: '/vehicle/list-detail',
  method: 'post',
  data
}).then(res => {
  return res
})
// 新增车辆
export const apiCreateVehicle = (data) => request({
  url: '/vehicle/create',
  method: 'post',
  data
}).then(res => {
  return res
})
// 更新车辆
export const apiUpdateVehicle = (data) => request({
  url: '/vehicle/update',
  method: 'post',
  data
}).then(res => {
  return res
})
// 删除车辆
export const apiDeleteVehicle = (data) => request({
  url: '/vehicle/delete',
  method: 'post',
  data
}).then(res => {
  return res
})


/*
风险等级
*/

// 风险等级列表
export const apiRiskList = (data) => request({
  url: '/risk/list',
  method: 'post',
  data
}).then(res => {
  return res
})
// 新增风险等级
export const apiCreateRisk = (data) => request({
  url: '/risk/create',
  method: 'post',
  data
}).then(res => {
  return res
})
// 更新风险等级
export const apiUpdateRisk = (data) => request({
  url: '/risk/update',
  method: 'post',
  data
}).then(res => {
  return res
})
// 删除风险等级
export const apiDeleteRisk = (data) => request({
  url: '/risk/delete',
  method: 'post',
  data
}).then(res => {
  return res
})
// 部件列表
export const apiPartsList = (data) => request({
  url: '/parts/list',
  method: 'post',
  data
}).then(res => {
  return res
})

// 部件列表
export const apiPartsListPage = (data) => request({
  url: '/parts/page',
  method: 'post',
  data
}).then(res => {
  return res
})

// 部件列表
export const apiPartsUpdateName = (data) => request({
  url: '/parts/updateName',
  method: 'post',
  data
}).then(res => {
  return res
})

// 检测项列表
export const apiItemList = (data) => request({
  url: '/item/list',
  method: 'post',
  data
}).then(res => {
  return res
})

// 根据部件展示检测项
export const apiPartsItemList = (data) => request({
  url: '/item/listByPartId',
  method: 'post',
  data
}).then(res => {
  return res
})

// 检测项列表
export const apiItemListPage = (data) => request({
  url: '/item/page',
  method: 'post',
  data
}).then(res => {
  return res
})

// 检测项列表
export const listByPartId = (data) => request({
  url: '/item/listByPartId',
  method: 'post',
  data
}).then(res => {
  return res
})

// 部件列表
export const apiUpdateItemName = (data) => request({
  url: '/item/updateName',
  method: 'post',
  data
}).then(res => {
  return res
})

// 缺陷列表
export const apiErrorList = (data) => request({
  url: '/error/list',
  method: 'post',
  data
}).then(res => {
  return res
})
// 批量更新
export const apiUpdateBatch = (data) => request({
  url: '/risk/updateBatch',
  method: 'post',
  data
}).then(res => {
  return res
})


//车型
export const apiGetVehicleModel = (data) => request({
  url: '/vehicle-model/list',
  method: 'post',
  data
})
//导出
export const apiExportList =  ({url, params, name, token})=> exportExcel2({url, params, name, token})
