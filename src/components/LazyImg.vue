<!--
 * @Date: 2022-07-26 14:21:30
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-11-27 09:16:05
 * @FilePath: \web_360_admin\src\components\LazyImg.vue
--> 
<template>
  <div
    class="lazy-img"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <div v-show="!loaded" v-loading="loading" class="lazy-img__loading">
      <div v-show="!loading" class="lazy-img__loading-reload" @click="reload">
        <i class="el-icon-refresh-right" />
      </div>
    </div>
    <img
      v-if="srcPath"
      class="lazy-img__img"
      draggable="false"
      :width="width"
      :height="height"
      :src="srcPath"
      @error="error"
      @load="load"
    >
  </div>
</template>
<script>
import { isEmpty } from "lodash-es";

// eslint-disable-next-line no-unused-vars
export default {
  props: {
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
    windowPosition: {
      type: Array,
      default: function (params) {
        return [];
      },
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
    width: {
      immediate: true,
      handler(val) {
        this.checkLoad(this.windowPosition, val);
      },
    },
    windowPosition: {
      deep: true,
      immediate: true,
      handler(val) {
        this.checkLoad(val, this.width);
      },
    },
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

    checkLoad(position, width) {
      if (isEmpty(position)) return;
      if (width <= 0) return;

      let [start, end] = position;
      let startPosition = this.startPosition;
      let endPosition = this.startPosition + width;
      if (
        (startPosition >= start && startPosition <= end) ||
        (endPosition >= start && endPosition <= end)
      ) {
        this.loadPic();
      }
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
  &__img {
    // -webkit-user-drag:none;
  }
}
</style>
