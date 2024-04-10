<!--
 * @Date: 2022-12-07 14:35:18
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-01-31 09:29:58
 * @FilePath: \web_360_admin\src\views\inspectManage\defect\component\SignItemBorder.vue
-->
<template>
  <div
    ref="signContainer"
    :style="{
      width: `${cpuWidth}px`,
      height: `${cpuHeight}px`,
      left: `${cpuStartPointX}px`,
      top: `${cpuStartPointY}px`,
    }"
    class="sign-container"
    @mousemove.stop
  />
</template>

<script>
export default {
  props: {
    rate: {
      type: Number,
      default: 0,
    },
    totalWidth: {
      type: Number,
      default: 0,
    },
    totalHeight: {
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
    startPointX: {
      type: Number,
      default: 0,
    },
    startPointY: {
      type: Number,
      default: 0,
    },
    zoomVal: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    cpuTotalWidth() {
      return this.totalWidth * this.rate * this.zoomVal;
    },
    cpuTotalHeight() {
      return this.totalHeight * this.rate * this.zoomVal;
    },
    cpuWidth() {
      return this.width * this.rate * this.zoomVal;
    },
    cpuHeight() {
      return this.height * this.rate * this.zoomVal;
    },
    cpuStartPointX() {
      return this.startPointX * this.rate * this.zoomVal;
    },
    cpuStartPointY() {
      return this.startPointY * this.rate * this.zoomVal;
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-container {
  position: absolute;
  cursor: move;
    position: relative;
    width: 100%;
    height: 100%;
    border:1px solid #fff;
}
</style>
