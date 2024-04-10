<!--
 * @Date: 2022-07-26 14:21:30
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-02-07 15:03:17
 * @FilePath: \web_360_admin\src\views\inspectManage\defect\component\LazyImg.vue
--> 
<template>
  <div
    class="lazy-img"
    :style="{ width: `${width}px !important`, height: `${height}px` }"
  >
    <div v-show="!loaded" v-loading="loading" class="lazy-img__loading">
      <div v-show="!loading" class="lazy-img__loading-reload" @click="reload">
        <i class="el-icon-refresh-right" />
      </div>
    </div>
    <img
      v-if="srcPath"
      class="lazy-img__img"
      :width="width"
      :height="height"
      :src="srcPath"
      @error="error"
      @load="load"
    >
  </div>
</template>
<script>
export default {
  props: {
    index: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    startPosition: {
      type: Number,
      default: 0,
    },
    isLoad: {
      type: Boolean,
      default: false
    },
    src: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      srcPath: null,
      loading: false,
      loaded: false,
    };
  },
  watch: {
    isLoad:{
      immediate: true,
      handler(val){
        if(this.index < 20){
          console.log('isLoad>>>', val)
        }
        if(val){
          this.loadPic()
        }
      }
    }
  },
  methods: {
    load() {
      this.loading = false;
      this.loaded = true;
    },

    error() {
      this.loading = false
      this.srcPath = null
    },

    async reload(){
      this.srcPath = null
      await this.$nextTick()
      this.loadPic()
    },

    loadPic() {
      if (this.loaded || this.srcPath) return;
      this.loading = true;
      this.srcPath = this.$store.state.system.setting.imgPath + this.src;
    },
  },
};
</script>

<style lang="scss" scoped>
.lazy-img {
  overflow: hidden;
  position: relative;
  &__loading {
    width: 100%;
    height:100%;
    position: absolute;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
    &-reload {
      width: 40px;
      height:40px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background: #bdb4b4;
      border-radius: 5px;
    }
  }
  &__img {}
}
</style>
