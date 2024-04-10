import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


import './permission'

// element
import ELEMENT from "element-ui";
import "./styles/element-variables.scss";
Vue.use(ELEMENT);

// drog
import "@/utils/drog.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// 注册总线
Vue.prototype.$EventBus = new Vue()
