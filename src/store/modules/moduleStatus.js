import {getModuleList} from '@/api/interface/index';
const state = {
  timer:0,
  data:{},
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
    getModuleList(params).then((res) => {
      context.state.data = res.data
    });
  },
}
export default {
  namespaced: true,
  state,
  actions
}