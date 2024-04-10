import request from '@/api/baseHttp/index.js'
// 获取首页相关数据
export const getHometList = (data) => request({
  url: '/home/list',
  method: 'post',
  data
}).then(res => {
  return res
})
// 获取首页故障列表
export const getHometDefectList = (data) => request({
  url: '/home/defect',
  method: 'post',
  data
}).then(res => {
  return res
})
// 获取首页过检车次
export const getHometVehicleList = (data) => request({
  url: '/home/vehicle',
  method: 'post',
  data
}).then(res => {
  return res
})

// 获取首页数据
export const getHometData = () => request({
  url: '/home/stat',
  method: 'post'
}).then(res => {
  return res
})


// 复检数据
export const checkData = (data) => request({
  url: '/home/recentTask',
  method: 'post',
  data
}).then(res => {
  return res
})

export const getTodayVehicle = (data) => request({
  url: '/home/todayVehicle',
  method: 'post',
  data
}).then(res => {
  return res
})
