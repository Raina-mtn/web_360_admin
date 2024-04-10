<!--
 * @Date: 2022-08-10 09:52:19
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2022-12-13 19:47:59
 * @FilePath: \web_360_admin\src\App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  mounted(){
    this.$store.dispatch('system/setImgPath')
  }
}
</script>
<style lang="scss">
#app {
  background: #060f2b;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-y: hidden;
}
</style>
