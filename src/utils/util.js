import { Message } from 'element-ui'
const { NODE_ENV, VUE_APP_DOMAIN_BASE} = process.env
export const clearEmptySearch = (params) => {
  const obj = {}
  Object.keys(params).forEach(key => {
    const value = params[key]
    if (typeof value === 'string') {
      if (value) {
        obj[key] = value
      }
    } else if (Array.isArray(value)) {
      if (value.length) {
        obj[key] = value
      }
    } else if (value !== null){
      obj[key] = value
    }
  })
  return obj
}
/**
 * 数组转树
 * @param {Array} list
 * @param {string} pid
 * @param {string} id
 */
export function arrayToTree(list = [], pid = 'parentId', id = 'id') {
  const data = JSON.parse(JSON.stringify(list))
  const result = []
  if (!Array.isArray(data)) {
    return result
  }
  data.forEach(item => {
    delete item.children
  })
  const map = {}
  data.forEach(item => {
    map[item[id]] = item
  })
  data.forEach(item => {
    const parent = map[item[pid]]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/**
   * 树转数组
   * @param {Array} list
   * @param {String} children
   * @param {String} id
   */
export function treeToArray(list = [], children = 'children') {
  const stack = JSON.parse(JSON.stringify(list))
  const data = []
  while (stack.length !== 0) {
    const pop = stack.pop()
    const popChildren = pop[children]
    delete pop[children]
    data.push(pop)
    if (popChildren) {
      for (let i = popChildren.length - 1; i >= 0; i--) {
        stack.push(popChildren[i])
      }
    }
  }
  return data
}
/**
 * 
 * @param {blob} data 返回字节流
 * @param {String} fileName 下载文件名
 */
export function exportExcel(data, fileName, type){
  
  const blob = new Blob([data],{type} );
  // { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" }
  const downlodUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = downlodUrl
  link.download = `${fileName}.xlsx`
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export function exportExcel2({url, params, name, token}){
  const xhr = new XMLHttpRequest()
  xhr.open('POST', `${NODE_ENV !== 'prod' ? VUE_APP_DOMAIN_BASE : `http://${window.location.host}`}${url}`)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    if(!xhr.getResponseHeader("Content-Disposition")){
      return Message.error('下载导出文件异常')
    }
    // let fileName, fileType
    // if(navigator.userAgent.indexOf("Firefox")>0){ // firefox取不到响应数据的文件名及类型
    //   fileName = name
    //   fileType = 'application/vnd.ms-excel'
    // }else{
    //   fileName = decodeURI(xhr.getResponseHeader("Content-Disposition").split(";")[1].split("filename=")[1]);
    //   fileType = xhr.getResponseHeader("content-type")
    // }
    exportExcel(xhr.response,  name, 'application/vnd.ms-excel')
  }
  // 传递 token
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('token', token);
  xhr.send(JSON.stringify(params));
}

//下载
export function exportFile(data, fileName, type){
  const blob = new Blob([data],{type} );
  const downlodUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = downlodUrl
  link.download = `${fileName}`
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
export function exportZip({url, name, that, token}){
  // 等待服务器生成文件
  const xhr = new XMLHttpRequest()
  xhr.open('GET', `/rail-api${url}`)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    if(xhr.getResponseHeader('content-type').includes('application/json')){
      return Message.error('导出文件异常!')
    }
    else{
      exportFile(xhr.response,  name, 'application/x-zip-compressed')
    }
  }
  // 传递 token
  xhr.setRequestHeader('token', token);
  xhr.send();
}

export function exportZip1(url, name, token){
  // 等待服务器生成文件
  const xhr = new XMLHttpRequest()
  xhr.open('GET', `/rail-api${url}`)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    // exportFile(xhr.response,  name, 'application/x-zip-compressed')
  }
  // 传递 token
  xhr.setRequestHeader('token', token);
  xhr.send();
}


// 判断是否有参数
export function isEmpty(val) {
  // null
  if (val === null) return true
  
  // undefined
  if (val === undefined) return true

  if (typeof val === 'boolean') return false

  if (typeof val === 'number') return  false

  switch (Object.prototype.toString.call(val)) {
    // String or Array
    case '[object String]':
    case '[object Array]':
      return !val.length

    // Map or Set or File
    case '[object File]':
    case '[object Map]':
    case '[object Set]': {
      return !val.size
    }
    // Plain Object
    case '[object Object]': {
      return !Object.keys(val).length
    }
  }

  return false
}


