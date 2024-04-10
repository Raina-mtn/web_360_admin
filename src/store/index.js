
import vue from "vue";
import Vuex from "vuex";
import persistedState from 'vuex-persistedstate'
import user from './modules/user'
import permission from './modules/permission'
import system from './modules/sys'
import importRecord from './modules/importRecord'
import home from './modules/home'
import moduleStatus from './modules/moduleStatus'
import downLoad from '@/components/DownLoad/store.js'

vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fontSize: 0,
    line: {},
  },
  mutations:{
    SET_FONTSIZE(state, fontSize){
      state.fontSize = fontSize
    }
  },
  modules: {
    user,
    permission,
    system,
    importRecord,
    home,
    moduleStatus,
    downLoad
  },
  plugins: [persistedState({ // 存储选择线路到缓存, 使用persistedState存储有命名空间的state时，要使用对应的key值存储
    key: 'shenhao-vuex',
    reducer: state => ({
      user: state.user,
      system: state.system
    })
  })]
});
