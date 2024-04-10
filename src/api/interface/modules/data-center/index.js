import request from '@/api/baseHttp/index.js'
// 查询缺陷分析
const apiGetDefect = (data) => request({
  url: 'defect-analysis/get',
  method: 'post',
  data
}).then(res => {
  return res
})

// 查询指定时间内缺陷列表
const apiGetDefectList = (data) => request({
  url: 'defect-analysis/list',
  method: 'post',
  data
}).then(res => {
  return res
})
export { apiGetDefect, apiGetDefectList }

