import {getRecord,floatRecord,exportList} from '@/api/interface/modules/task-center/task-management.js';
const state = {
  tableData:[],
  total:0,
  timer:0,
  patrolTaskCount:0,
  importTaskCount:0,
  exportValue:{
    tableData:[],
    total:0,
  },
  timer1:0
}

const actions = {
  // 导入记录轮询方法
  polling (context,params) {
    clearTimeout(context.state.timer)
    context.dispatch('getList',params).then(res => {
      state.timer = setTimeout(() => {
        clearTimeout(context.state.timer)
        context.dispatch('getFloat',params)
        context.dispatch('polling',params)
      }, 5000)
    })
  },
  //请求接口
  getList(context,params) {
    getRecord(params).then((res) => {
      context.state.tableData = res.data.list;
      context.state.total = Number(res.data.totalCount);
    });
  },
  getFloat(context){
    floatRecord({}).then((res) => {
      context.state.patrolTaskCount = res.data.patrolTaskCount;
      context.state.importTaskCount = res.data.importTaskCount;
    });
  },
  
  exportPolling (context,params) {
    clearTimeout(context.state.timer1)
    context.dispatch('getExportList',params).then(res => {
      state.timer1 = setTimeout(() => {
        clearTimeout(context.state.timer1)
        context.dispatch('exportPolling',params)
      }, 5000)
    })
  },
  
  getExportList(context,params){
    exportList(params).then((res) => {
      context.state.exportValue.tableData = res.data.list;
      context.state.exportValue.total = res.data.totalCount;
    });
  }
}
export default {
  namespaced: true,
  state,
  actions
}