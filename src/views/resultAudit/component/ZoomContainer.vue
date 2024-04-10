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
        :data-freezed="freezed.toString()"
        class="view-item__move"
        :style="{
          transform: `translate(${dragZoom.translateX}px, ${dragZoom.translateY}px) scale(${dragZoom.scale})`,
        }"
      >
        <slot name="zoom-1" />
      </div>
    </div>
    <div ref="view-item-2" class="view-item">
      <div
        ref="move2"
        class="view-item__move"
        :data-freezed="freezed.toString()"
        :style="{
          transform: `translate(${dragZoom.translateX}px, ${dragZoom.translateY}px) scale(${dragZoom.scale})`,
        }"
      >
        <slot name="zoom-2" />
      </div>
    </div>
  </div>
</template>
<script>
import DragZoom from "@/utils/dragZoom.js";
export default {
  props: {
    freezed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dragZoom: new DragZoom(),
    };
  },
  mounted() {
    this.dragZoom.setOptions([this.$refs["move1"], this.$refs["move2"]]);
  },
  methods: {
    setPosition(item) {
      // 计算scale;
      const { partPixelX: innerWidth, partPixelY: innerHeight } = item;
      const { offsetHeight: outerHeight, offsetWidth: outerWidth } =
        this.$refs["view-item-1"];
      let scale = 1;
      if (outerHeight / outerWidth > 1) {
        scale = outerWidth / innerWidth;
      } else {
        scale = outerHeight / innerHeight;
      }
      this.dragZoom.scale = scale;
      this.dragZoom.minScale = scale;

      // 计算部件中心
      let { width, height, pointX, pointY } = item;
      let picCenterX = outerWidth / 2;
      let picCenterY = outerHeight / 2;

      let partCenterX = (pointX + width / 2) * scale;
      let partCenterY = (pointY + height / 2) * scale;

      let translateX = picCenterX - partCenterX;
      let translateY = picCenterY - partCenterY;
      this.dragZoom.translateX = translateX;
      this.dragZoom.translateY = translateY;
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
