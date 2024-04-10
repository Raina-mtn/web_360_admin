import request from '@/api/baseHttp/index.js'
//提交标记信息
export const getTaskList = (data) => request({
  url: '/task/list',
  method: 'post',
  data
})

export const delTaskList = (data) => request({
  url: '/task/delete',
  method: 'post',
  data
})
