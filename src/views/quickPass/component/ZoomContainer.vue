<!--
 * @Date: 2022-12-05 15:59:07
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-11-27 09:58:35
 * @FilePath: \web_360_admin\src\components\ZoomContainer\ZoomContainer.vue
-->
<template>
  <div class="viewer">
    <div class="title">
      正常图
    </div>
    <div ref="view-item-1" class="view-item">
      <div
        ref="move1"
        :data-freezed="freezed.toString()"
        class="view-item__move"
        :style="{
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        }"
      >
        <slot name="zoom-1" />
      </div>
    </div>
    <div class="title title__compare">
      对比图
    </div>

    <div ref="view-item-2" class="view-item">
      <div
        ref="move2"
        class="view-item__move"
        :data-freezed="freezed.toString()"
        :style="{
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
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
    outTranslateX: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      scale: 1,
      translateX: 0,
      translateY: 0,
      dragZoom: new DragZoom(),
    };
  },
  watch: {
    outTranslateX: {
      handler(val) {
        this.translateX = val;
        this.dragZoom.translateX = val;
      },
    },
  },
  mounted() {
    this.dragZoom.setOptions([this.$refs["move1"], this.$refs["move2"]], this.sizeChange);
    this.setPosition();
  },
  methods: {
    sizeChange(e) {
      const { isDrawing, scale, translateX, translateY } = e;
      this.isDrawing = isDrawing;
      this.scale = scale;
      this.translateX = translateX;
      this.translateY = translateY;
      this.$emit("ZoomSizeChange", { scale, translateX });
    },
    setPosition(innerOffsetHeight) {
      console.log('innerOffsetHeight>>', innerOffsetHeight)
      const { offsetHeight: outerHeight } = this.$refs["view-item-2"];
      let scale = outerHeight / innerOffsetHeight;
      this.scale = scale;
      this.dragZoom.scale = scale;
      this.dragZoom.minScale = scale;
      this.translateX = 0;
      this.translateY = 0;
      this.$emit("ZoomSizeChange", { scale });
    },
  },
};
</script>
<style lang="scss" scoped>
.viewer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .view-item {
    width: 100%;
    height: 50%;
    overflow-x: hidden;
    overflow-y: hidden;
    border: 1px solid #fff;
    .view-item__move {
      width: fit-content;
    }
  }

  .slider-container {
    width: 100%;
    height: 30px;
    /* position: absolute;
    top: 0;
    left: 0;
    z-index: 7; */
    /* background-color: "tranparent"; */
    background-color: red;
    .img-container {
      width: 100%;
      overflow-x: scroll;
      background-color: "tranparent";
      .img-container-list {
        display: flex;
        width: fit-content;
        height: fit-content; // 和rate里面的高度一致
        background-color: "tranparent";
      }
    }
  }

  div::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: inherit;
    background-color: "tranparent";
  }

  div::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    background: #011243;
  }

  div::-webkit-scrollbar-track {
    background-color: rgba(175, 175, 175, 0.1);
    /*滚动条里面轨道*/
    border-radius: 0;
    // background: url("~@/assets/images/pic_subway.png");
    // background-size: 100% 100%;
    // background-repeat: no-repeat;
  }
}

.title {
  color: #fff;
  font-size: 16px;
  position: relative;
  z-index: 1;
  padding-left: 30px;
  background: url("~@/assets/images/bg_nomarlPic.png") no-repeat;
  margin: 10px 0;
}

.title__compare {
  background: url("~@/assets/images/bg_Comparison.png") no-repeat;
}
</style>
