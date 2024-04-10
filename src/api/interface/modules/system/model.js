import service from '@/api/baseHttp/index.js'

export async function getRobotModelList(data) {
  let resData = await Promise.all([
    service({
      url: "/robot/model/list",
      method: "post",
      data
    }),
    service({
      url: "/robot/device/type",
      method: "post",
      data
    })
  ])
  let list = resData[0].data.list
  let deviceList = resData[1].data
  resData[0].data.list = list.map((item) => {
    let { componentList } = item
    let newComponentList = componentList.map(({...componentItem}) => {
      let { settings } =deviceList.find(deviceItem => deviceItem.type == componentItem.deviceType)
      return {...componentItem, settings}
    })
    return {...item, componentList: newComponentList}
  })
  return  resData[0]
}


// 创建型号
export function createRobotModel(data) {
  return service({
    url: "/robot/model/create",
    method: "post",
    data
  })
}

// 更新型号
export function updateRobotModel(data) {
  return service({
    url: "/robot/model/edit",
    method: "post",
    data
  })
}

// 删除信型号
export function deleteRobotModel(data) {
  return service({
    url: "/model/delete",
    method: "post",
    data
  })
}

/* ------ 组件list ------- */
// 获取机器人设备类
export function getRobotDeiveType() {
  return service({
    url: '/robot/device/type',
    method: 'post',
  });
}


// 上传 "gif", "jpeg", "jpg", "png"
export const uploadImg = (data) => service({
  url: '/image/upload',
  method: 'post',
  data
}).then(res => {
  return res
})
