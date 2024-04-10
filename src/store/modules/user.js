import {apiLogin, apiLogout, apiUserInfo, changeLocale} from '@/api/interface/index.js'
// import { resetRouter } from '@/router'
import { Notification } from 'element-ui';
import { removeToken } from '@/utils/token.js'
const user = {
  namespaced: true,
  state: {
    token: '', // 登录令牌
    userInfo: {}, // 用户信息
    lang: 'zhTraditional'
  },
  mutations: {
    SET_TOKEN: (state, newToken) => {
      state.token = newToken
    },
    SET_USERINFO: (state, info) => {
      state.userInfo = { ...info }
    },
    RESET_STATE: (state) => {
      state.token = ''
      state.userInfo = {}
    },
    SET_LANG: (state, lang) => {
      console.log('lang', lang)
      state.lang = lang
    },
  },
  actions: {
    login({ commit }, userInfo) {
      const { username, pass } = userInfo
      return new Promise((resolve, reject) => {
        apiLogin({ username: username.trim(), pass }).then(response => {
          const { data } = response
          commit('SET_TOKEN', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        apiLogout().then(() => {
          commit('RESET_STATE')
          resolve()
          Notification.closeAll() // 实时监控会提示报警信息，退出登录后要全部清空
          removeToken()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        apiUserInfo().then(response => {
          const { data } = response
          const { id, userName, realName,resourceCodes } = data
          commit('SET_USERINFO', { id, userName, realName, resourceCodes })
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    resetState({ commit }) {
      return new Promise(resolve => {
        commit('RESET_STATE')
        resolve()
      })
    },
    async setLang({ commit }, lang){
      let params = {}
      if(lang == 'zhTraditional')params['locale'] = 'zh_HK';
      if(lang == 'zhSimplifiexd')params['locale'] = 'zh_CN';
      await changeLocale(params)
      commit("SET_LANG", lang)
    }
  },
  getters: {
    userName: (state) => state.userInfo.userName
  }
}
export default user