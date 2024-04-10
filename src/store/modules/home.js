import {getHometList,getHometDefectList} from '@/api/interface/index';
const state = {
  // total:0,
  timer:0,
  defectTimer:0,
  defectVoList:[],//故障列表
  total:0,//故障列表总数
  data:{
    taskCount:0,//过检车次
    gradeVoList:[],//报警等级
    itemVoList:[],//报警分布
    vehicleDefectVoList:[],//车故障数排行
    vehicleVoList:[],//未检列车
    online:false,
  },
}

const actions = {
  // 导入记录轮询方法
  polling (context,params) {
    clearTimeout(context.state.timer)
    context.dispatch('getList',params).then(res => {
      state.timer = setTimeout(() => {
        clearTimeout(context.state.timer)
        context.dispatch('polling',params)
      }, 10000)
    })
  },
  //请求接口
  getList(context,params) {
    getHometList(params).then((res) => {
      context.state.data = res.data
    });
  },
  // 故障列表轮询方法
  defectPolling (context,params) {
    clearTimeout(context.state.defectTimer)
    context.dispatch('defectGetList',params).then(res => {
      state.defectTimer = setTimeout(() => {
        clearTimeout(context.state.defectTimer)
        context.dispatch('defectPolling',params)
      }, 10000)
    })
  },
  //故障列表请求接口
  defectGetList(context,params) {
    getHometDefectList(params).then((res) => {
      context.state.defectVoList = res.data
      context.state.total = Number(res.data.totalCount)
    });
  },
}
export default {
  namespaced: true,
  state,
  actions
}