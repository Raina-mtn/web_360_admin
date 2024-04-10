import Axios from 'axios'
import { fileDownLoad, fileDownLoad1 } from './utils'
import { Message } from 'element-ui'
const { VUE_APP_DOMAIN_BASE, NODE_ENV, VUE_APP_IMAGE_PATH_DOMAIN } = process.env;
import store from '@/store/index'

class DownLoadModel {
  filename = '生成中'
  process = 0;
  commit = null;
  source = Axios.CancelToken.source();
  status = 'downloading' // success, error
  constructor(url, data, commit, responseType = 'blob') {
    this.commit = commit

    Axios({
      method: 'post',
      baseURL: NODE_ENV !== 'prod' ? VUE_APP_DOMAIN_BASE : `http://${window.location.host}`,
      url,
      data,
      cancelToken: this.source.token,
      responseType,
      headers: { token: store?.state?.user?.token },
      timeout: 10 * 60 * 1000,
      onDownloadProgress: (progressEvent) => {
        const { total, loaded } = progressEvent
        this.process = Number(((loaded / total) * 100).toFixed(2))

        if (responseType == 'blob') {
          const fileName = progressEvent.currentTarget.getResponseHeader('filename')
          if (fileName && this.filename == '生成中') {
            this.filename = decodeURI(fileName)
          }
        }
      }
    }).then((res) => {
      if (responseType == 'blob') {
        const filename1 = decodeURI(res.headers.filename)
        fileDownLoad(res.data, filename1 + '.xlsx')
      } else if (responseType == 'json') {
        console.log(res.data)
        if (!res.data?.data) {
          let message = res.data.msg || '报表记录未生成'
          throw new Error(message)
        }
        
        let url = NODE_ENV !== 'prod' ? VUE_APP_IMAGE_PATH_DOMAIN : `http://${window.location.host}/upload-image`;
        fileDownLoad1(url+res.data.data, res.data.data.fileName)
      }
      this.process = 100
      this.remove()
      this.status = 'success'
    })
      .catch((e) => {
        if (Axios.isCancel(e)) {
          console.log('Request canceled', e.message)
          Message.info('取消下载')
        } else {
          this.status = 'error'
          let message = e.message || '下载失败'
          // handle error
          Message.error(message)
        }
      })
  }

  _getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  remove = () => this.commit('REMOVE', this)

  cancel = () => {
    try {
      this.source.cancel('Operation canceled by the use')
      // eslint-disable-next-line no-empty
    } catch (error) {

    }
    this.remove()
  }
}

const downLoad = {
  namespaced: true, // 开启命名空间
  state: {
    downloadingList: []
  },
  mutations: {
    ADD(state, val) {
      if (state.downloadingList.length > 5) {
        Message.info('同时下载不能大于5')
        return
      }
      state.downloadingList.unshift(val)
    },
    REMOVE(state, val) {
      state.downloadingList.splice(state.downloadingList.indexOf(val), 1)
    }
  },
  actions: {
    add: function ({ commit }, item) {
      const { url, params, responseType = 'blob' } = item
      const newDownLoad = new DownLoadModel(url, params, commit, responseType)
      console.log(url, params)
      commit('ADD', newDownLoad)
    }
  }
}
export default downLoad
