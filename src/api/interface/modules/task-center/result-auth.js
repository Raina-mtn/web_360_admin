import service from '@/api/baseHttp/index.js'

/* --------------    结果审核列表操作   --------------------*/
// 获取审核列表
export async function getResultAuthList(data) {
  return service({
    url: "task/record/list",
    method: "post",
    data,
    config:{
      showLoading: true
    }
  })
}

// 更新审核
export function upDataResultAuth(data) {
  return service({
    url: "patrol-record/modify",
    method: "post",
    data
  })
}

// 三维显示
export function getPcdPath(data) {
  return service({
    url: "algorithm/identify",
    method: "get",
    data
  })
}

