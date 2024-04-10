import {exportZip} from '@/utils/util'
import service from '@/api/baseHttp/index.js'
// import { ResultModel } from '@/model/common/index.js'

/* --------------    导出任务列表操作   --------------------*/
// 获取导出列表
export function getExportTaskList(data) {
  return service({
    url: "/job/export/list",
    method: "post",
    data,
    apiResposeInterceptor: (res) => {
      const data = {}
      data['list'] = res.data.list
      data['totalElements'] = res.data.totalCount
      // return new ResultModel({ success: true, message: 'success', data })
    }
  })
}

export const apiDownloadExportTask =  ({params, fileName, that, token})=> exportZip({url:`/job/export/downloadZip?${params}`, name:fileName, that:that, token})

// 下载
export function downLoad(params) {
  return service({
    url: "/job/export/download",
    method: "get",
    params
  })
}

// 获取告警列表
export function createExportTaskList(data) {
  return service({
    url: "/job/export/create",
    method: "post",
    data
  })
}
