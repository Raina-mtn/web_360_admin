/**
 * 获取所有线路
 */
import request from '@/api/baseHttp'
const apiGetLine = (data) => request({
  url: '/common-api/subway/line',
  method: 'post',
  data
}).then(res => {
  return res
})

export default apiGetLine

