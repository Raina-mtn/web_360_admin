/* eslint-disable no-unused-vars */
import service from '@/api/baseHttp/index.js'
import dayjs from 'dayjs'

// 获取通道列表信息
export const getNewEchartItemList = (data) => service({
  url: "defect-analysis/geometry",
  method: 'post',
  data
}).then(res => {
  const data = []
  const dataArr = res.data
  for (const key in dataArr) {
    const item = { ...dataArr[key], list: [] }
    item.base = Number(item.base)
    for (const resultKey in item.geometryPatrolResultBoMap) {
      const listItem = item.geometryPatrolResultBoMap[resultKey]
      const newListItem = {
        time: dayjs(resultKey).format('YYYY-MM-DD'),
        markPoints: listItem,
        id: new Date().getTime()

      }
      item.list.push(newListItem)
    }
    delete item.geometryPatrolResultBoMap
    data.push(item)
  }
  res.data = data
  return res
})

// 获取通道的 检测列表 /defect-analysis/get
export function getIndicatorList(data) {
  return service({
    url: "task/list-patrol-date",
    method: "post",
    data
  })
}

// 获取轨道几何缺陷
export const getGeometryData = (data) => service({
  url: "patrol-record/geometry",
  method: 'post',
  data
}).then(res => {
  const data = []
  const dataArr = res.data
  for( let [key, value] of Object.entries(dataArr)){
    const item = { ...value, list: [] }
    item.base = Number(item.base)
    for (const resultKey in item.patrolResultMap) {
      const listItem = item.patrolResultMap[resultKey]
      const newListItem = {
        time: dayjs(resultKey).format('YYYY-MM-DD'),
        markPoints: listItem,
        id: new Date().getTime()
      }
      item.list.push(newListItem)
    }
    delete item.patrolResultMap
    data.push(item)
  }
  res.data = data
  return res
})

// 获取轨道几何缺陷
export const getGeometryDefectList = (data) => service({
  url: "patrol-record/list",
  method: 'post',
  data
}).then(res => {
  return res
})

// 获取缺陷点位
export const getDefectData = (data) => service({
  url: "patrol-record/defect-analysis",
  method: 'post',
  data
}).then(res => {
  const data = []
  if(res.data.patrolResult.gradeData.length > 0){
    const resData = res.data
    const item = { ...resData, list: [] }
    item.base = Number(item.base)
    const newListItem = {
      markPoints: item.patrolResult,
      id: new Date().getTime()
    }
    item.list.push(newListItem)
    delete item.patrolResult
    data.push(item)
  }
  res.data = data
  return res
})

// 其他获取缺陷列表
export const getDefectList = (data, intercept) => service({
  url: "patrol-record/list",
  method: 'post',
  data
}).then(res => {
  res.data.list.forEach(item => {
    item.mileage = Number(item.mileage).toFixed(2).toString();
    item.position = Number(item.position).toFixed(2).toString()
  });
  return res
})


// 获取轨道几何缺陷
export const horizontalCorrect = (data) => service({
  url: "patrol-record/correct",
  method: 'post',
  data
}).then(res => {
  return res
})