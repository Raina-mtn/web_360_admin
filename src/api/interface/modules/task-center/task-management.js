import service from '@/api/baseHttp/index.js'

/* --------------    任务管理列表操作   --------------------*/
// 获取任务列表
export function getTaskList(data) {
  return service({
    url: "task/list",
    method: "post",
    data,
    config:{
      showLoading: true
    }
  })
}

// 创建任务
export function createTask(data) {
  return service({
    url: "task/create",
    method: "post",
    data
  })
}

// 更新任务
export function updateTask(data) {
  return service({
    url: "task/update",
    method: "post",
    data
  })
}

// 暂停任务
export function suspendTask(data) {
  return service({
    url: "task/suspend",
    method: "post",
    data
  })
}

// 继续任务
export function resumeTask(data) {
  return service({
    url: "task/resume",
    method: "post",
    data
  })
}

// 取消任务
export function cancelTask(data) {
  return service({
    url: "task/cancel",
    method: "post",
    data
  })
}

// 终止任务
export function terminateTask(data) {
  return service({
    url: "task/end",
    method: "post",
    data
  })
}

// 获取线路  特殊情况：为实现功能
export function getSubwayLineList(data) {
  return service({
    url: "subway/line",
    method: "post",
    data
  })
}
export function getIndicatorList(data) {
  return service({
    url: "indicator/list-recursive",
    method: "post",
    data
  })
}

//导入任务
export function importTask(data){
  return service({
    url:"patrol-record/import",
    method:"post",
    data
  })
}

//获取机器人编号
export function getRobotId(data){
  return service({
    url:"robot/list",
    method:"post",
    data
  })
}

//获取线路名称
export function getLineName(data){
  return service({
    url:"subway/line",
    method:"post",
    data
  })
}

//导入记录
export function getRecord(data){
  return service({
    url:"job/import/list",
    method:"post",
    data
  })
}

//导出记录
export function exportRecord(data){
  return service({
    url:"patrol-defect/export",
    method:"post",
    data
  })
}

//获取初始路径
export function beginPath(data){
  return service({
    url:"path/getRoot",
    method:"get",
    data
  })
}

//获取选中目录下全部文件夹
export function allPath(data){
  return service({
    url:"path/getPath",
    method:"get",
    data
  })
}

//查询重复导入任务
export function getDuplicated(data){
  return service({
    url:"patrol-record/duplicated",
    method:"post",
    data
  })
}

//重新导入任务
export function importRedo(data){
  return service({
    url:"job/import/redo",
    method:"post",
    data
  })
}

//一键审核
export function taskAudit(data){
  return service({
    url:"task/audit",
    method:"post",
    data
  })
}

//悬浮框
export function floatRecord(data){
  return service({
    url:"job/import/unfinished",
    method:"post",
    data
  })
}

//导出列表
export function exportList(data){
  return service({
    url:"/job/export/list",
    method:"post",
    data
  })
}
