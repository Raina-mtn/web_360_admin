import zhSimplifiexd from "./config/zh-simplified";
import zhSimplifiexdElement from 'element-ui/lib/locale/lang/zh-CN'
import zhTraditional from "./config/zh-traditional";
import zhTraditionaElement from 'element-ui/lib/locale/lang/zh-TW'

import VueI18n from 'vue-i18n'
import Vue from "vue"
import store from '@/store'

Vue.use(VueI18n)
const messages = {
  zhSimplifiexd:{ ...zhSimplifiexd, ...zhSimplifiexdElement },
  zhTraditional: { ...zhTraditional, ...zhTraditionaElement },
}

const { lang } = store.state.user
console.log('lang set', zhSimplifiexdElement)


export default new VueI18n({
  locale: lang  || 'zhSimplifiexd', 
  messages
})