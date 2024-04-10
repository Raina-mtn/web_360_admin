import request from '@/api/baseHttp/index.js'
// 菜单列表
export const apiGetMenuList = (data) => request({
  url: '/resource/list-menu',
  method: 'post',
  data
}).then(res => {
  return res
})