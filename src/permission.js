import router from './router'
import store from '@/store'
// import { Message } from 'element-ui'
import { isEmpty } from "lodash-es";

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {

  const { token } = store.state.user
  // token 不存在的情况
  if(!token){
    if (whiteList.indexOf(to.path) !== -1) {
      return next()
    } 
    return next(`/login?redirect=${to.path}`)
  }

  // token存在,路由信息不存在
  try {
    let { asyncRoutes } = store.state.permission;
    if(isEmpty(asyncRoutes)){
      let userInfo = store.state.user.userInfo
      console.log('userInfo',userInfo);
      if(isEmpty(userInfo)) userInfo = await store.dispatch('user/getInfo');
      console.log('userInfo.resourceCodes', userInfo.resourceCodes)
      let accessRoutes = await store.dispatch('permission/generateRoutes', userInfo.resourceCodes);
      console.log('userInfo.accessRoutes', accessRoutes)
      if (!isEmpty(accessRoutes)) {
        accessRoutes.forEach(routeObj => {
          router.addRoute('index', routeObj)
        })
        return next({ ...to, replace: true })
      }
    }
    next()
  } catch (error) {
    await store.dispatch('user/resetState')
    // Message.error('Has Error')
    next(`/login?redirect=${to.path}`)
  }

})
