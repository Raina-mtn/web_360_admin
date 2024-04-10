<!--
 * @Date: 2022-12-05 15:59:07
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-11-27 09:58:35
 * @FilePath: \web_360_admin\src\components\ZoomContainer\ZoomContainer.vue
-->
<template>
  <div class="viewer">
    <div ref="view-item-1" class="view-item">
      <div
        ref="move1"
        v-dragZoom
        :data-freezed="freezed.toString()"
        class="view-item__move"
        :style="{
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        }"
        @sizeChange="sizeChange"
      >
        <slot name="zoom-1" />
      </div>
    </div>
    <div ref="view-item-2" class="view-item">
      <div
        ref="move2"
        v-dragZoom
        class="view-item__move"
        :data-freezed="freezed.toString()"
        :style="{
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        }"
        @sizeChange="sizeChange"
      >
        <slot name="zoom-2" />
      </div>
    </div>
  </div>
</template>
<script>
import DragZoom from "./dragZoom";
export default {
  directives: {
    dragZoom: new DragZoom(),
  },
  props: {
    freezed: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      scale: 1,
      translateX: 0,
      translateY: 0,
    };
  },
  methods: {
    sizeChange(e) {
      const { isDrawing, scale, translateX, translateY } = e.detail;
      this.isDrawing = isDrawing;
      this.scale = scale;
      this.translateX = translateX;
      this.translateY = translateY;
    },
  },
};
</script>
<style lang="scss" scoped>
.viewer {
  width: 100%;
  height: 100%;
  display: flex;
  .view-item {
    width: 50%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    .view-item__move {
      width: fit-content;
    }
  }
}
</style>
