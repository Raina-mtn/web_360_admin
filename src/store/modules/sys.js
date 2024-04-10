import {apiGetSysSetting} from '@/api/interface/index.js'
// import {themeSettingObj} from '@/utils/config'
import { isEmpty } from "@/utils/util.js";
const system = {
  namespaced: true,
  state: {
    theme:{
      pattern: 'default',
      color: '#F5A100'
    },
    setting:{
      homepageLogo:require('@/assets/images/logo.png'),
      loginLogo:require('@/assets/images/logo.png'),
      title: '车辆360°动态图像智能检测系统',
      softwareVersion:'V 2.0.0',
      imgPath:null
    }
  },
  mutations: {
    SET_SETTING: (state, { loginLogo, homepageLogo, pattern, softwareVersion, title, imgPath }) => {
      !isEmpty(loginLogo) && ( state.setting.loginLogo = loginLogo)
      !isEmpty(homepageLogo) && ( state.setting.homepageLogo = homepageLogo)
      !isEmpty(softwareVersion) && (state.setting.softwareVersion = softwareVersion)
      !isEmpty(title) && (state.setting.title = title)

      !isEmpty(imgPath) && ( state.setting.imgPath = imgPath );
    }
  },
  actions: {
    getSysSetting({commit}){
      apiGetSysSetting().then(res=>{
        commit('SET_SETTING', res.data)
      })
    },

    setImgPath({commit}){
      const { NODE_ENV, VUE_APP_DOMAIN_BASE } = process.env
      let {protocol, hostname, port } = window.location
      let imgPath =  NODE_ENV !== 'prod'? `${VUE_APP_DOMAIN_BASE}/upload-image` : `${protocol}//${hostname}:${port}/upload-image`
      commit('SET_SETTING', {imgPath})
    }
  },
  getters: {
    themeColor: (state) => state.theme.color,
    themePattern: (state) => state.theme.pattern,
  }
}
export default system