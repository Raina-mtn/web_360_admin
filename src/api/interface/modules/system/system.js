import service from '@/api/baseHttp/index.js'


/* --------------    系统设置   --------------------*/
// 获取列表
export function getSystemSettingList() {
  return service({
    url: "config/list",
    method: "post"
  })
}

// 更新设置
export function updateSystemSettingList(data) {
  return service({
    url: "config/edit",
    method: "post",
    data
  })
}
