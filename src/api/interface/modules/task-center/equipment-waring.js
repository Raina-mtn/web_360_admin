import service from '@/api/baseHttp/index.js'

/* --------------    设备告警列表操作   --------------------*/
// 获取告警列表
export function getEquipmentWaringList(data) {
  return service({
    url: "warning/list",
    method: "post",
    data,
    config:{
      showLoading: true
    }
  })
}

// 获取告警列表
export function upDataEquipmentWaring(data) {
  return service({
    url: "warning/handle",
    method: "post",
    data
  })
}
