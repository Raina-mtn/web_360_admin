<!--
 * @Date: 2022-07-26 14:21:30
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-12-04 17:48:10
 * @FilePath: \web_360_admin\src\views\resultAudit\component\silder.vue
-->
<template>
  <div class="slider-container">
    <div ref="test-container" class="img-container" @scroll="scroll">
      <div class="img-container-list">
        <div
          :style="{
            width: `${contentWidth * scale}px`,
            height: '1px',
            backgroundColor: 'tranparent',
          }"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { debounce } from "lodash-es";
export default {
  components: {},
  props: {
    contentWidth: {
      type: Number,
      default: 0,
    },
    scale: {
      type: Number,
      default: 0,
    },
    outTranslateX: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      stopEmit: false,
    };
  },
  watch: {
    outTranslateX: {
      handler(val) {
        this.stopEmit = true;
        this.$refs["test-container"].scrollLeft = Math.abs(val);
        this.setTranslateX();
      },
    },
  },
  mounted() {},
  methods: {
    scroll(e) {
      if (this.stopEmit) {
        return;
      }
      let { scrollLeft } = e.target;
      this.$emit("sliderChange", { translateX: -scrollLeft });
    },
    setTranslateX: debounce(function () {
      this.stopEmit = false;
    }, 100),
  },
};
</script>
<style lang="scss" scoped>
.slider-container {
  width: 100%;
  height: 100%;
  /* position: absolute;
    top: 0;
    left: 0;
    z-index: 7; */
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  .img-container {
    width: 100%;
    overflow-x: scroll;
    background-color: transparent;
    .img-container-list {
      display: flex;
      width: fit-content;
      height: fit-content; // 和rate里面的高度一致
      background-color: transparent;
    }
  }
}
div::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: inherit;
  background-color: transparent;
}

div::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background: #ff2a0080;
}

div::-webkit-scrollbar-track {
  background-color: rgba(175, 175, 175, 0.1);
  /*滚动条里面轨道*/
  border-radius: 0;
  // background: url("~@/assets/images/pic_subway.png");
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
}
</style>
