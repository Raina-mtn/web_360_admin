import request from '@/api/baseHttp/index.js'
// 查询指定日期内缺陷级别统计
export const apiGetGradeStat = (data) => request({
  url: 'patrol-analysis/defect-grade-stat',
  method: 'post',
  data
}).then(res => {
  return res
})

// 查询指定日期内巡检统计明细
export const apiGetDetailStat = (data) => request({
  url: 'patrol-analysis/detail-stat',
  method: 'post',
  data
}).then(res => {
  return res
})
// 查询指定日期内指标统计
export const apiGetIndicatorStat = (data) => request({
  url: 'patrol-analysis/indicator-stat',
  method: 'post',
  data
}).then(res => {
  return res
})
// 查询指定日期内里程统计
export const apiGetMileStat = (data) => request({
  url: 'patrol-analysis/mile-stat',
  method: 'post',
  data
}).then(res => {
  return res
})
