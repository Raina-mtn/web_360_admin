import service from '@/api/baseHttp/index.js'

/* --------------    机器人列表操作   --------------------*/
// 型号列表
export async function getRobotModelList(data) {
  let resData = await Promise.all([
    service({
      url: "/robot/model/list",
      method: "post",
      data
    })
  ])
  return resData
}

// 获取机器人列表
export function getRobotList(data) {
  return service({
    url: "/robot/list-detail",
    method: "post",
    data
  })
}

// 获取单个机器人列表
export function getRobotInfo(data) {
  return service({
    url: "/robot/get",
    method: "post",
    data
  })
}

// 创建机器人
export function createRobot(data) {
  return service({
    url: "/robot/create",
    method: "post",
    data
  })
}

// 更新机器人
export function updateRobot(data) {
  return service({
    url: "/robot/update",
    method: "post",
    data
  })
}
// 设置机器人配置项
export function editRobotCommonSet(data) {
  return service({
    url: "/robot/setting/edit",
    method: "post",
    data
  })
}

// 获取机器人设备类
export function getRobotDeiveType() {
  return service({
    url: "/robot/device/type",
    method: "post"
  })
}

// 删除机器人
export function deleteRobot(data) {
  return service({
    url: "/robot/delete",
    method: "post",
    data
  })
}

// 更新机器人设备
export function updateRobotDevice(data) {
  return service({
    url: "/robot/device/save",
    method: "post",
    data
  })
}