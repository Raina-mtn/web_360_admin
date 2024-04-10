<!--
 * @Date: 2022-07-26 14:21:30
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-11-22 15:38:44
 * @FilePath: \web_360_admin\src\components\drawDiv.vue
-->
<template>
  <div
    class="draw-container"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <div
      v-for="(item, index) in drawList"
      :key="index"
      class="draw-div-item"
      :style="{
        width: `${item.width}px`,
        height: `${item.height}px`,
        left: `${item.x}px`,
        top: `${item.y}px`,
      }"
    />
    <div class="draw-background">
      <slot />
    </div>
  </div>
</template>
<script>
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
    drawList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.draw-container {
  position: relative;
  .draw-div-item {
    position: absolute;
    z-index: 99;
    border:2px solid red;
  }

  .draw-background {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 88;
  }
}
</style>
