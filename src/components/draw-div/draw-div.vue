<!--
 * @Date: 2022-07-26 14:21:30
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-11-28 09:51:19
 * @FilePath: \web_360_admin\src\components\draw-div\draw-div.vue
-->
<template>
  <div
    class="draw-container"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <canvas
      id="c"
      :width="`${width}px`"
      :height="`${height}px`"
      style="
        position: absolute;
        z-index: 999;
        top: 0;
        left: 0;
      "
    />
    <div class="draw-background">
      <slot />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { fabric } from "fabric";
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
    return {
      canvas: null,
    };
  },
  watch: {
    drawList: {
      handler: function (arrary) {
        this.$nextTick(() => {
          console.log('array=>>>>',arrary)
          arrary.map((item) => {
            this.add(Number(item.width), Number(item.height), item.x, item.y);
            // this.add()
          });
        });
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.initFabric();
  },
  methods: {
    initFabric() {
      this.canvas = this.__canvas = new fabric.Canvas("c");
      // create a rect object
      let deleteIcon =
        "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

      let img = document.createElement("img");
      img.src = deleteIcon;

      fabric.Object.prototype.transparentCorners = false;
      fabric.Object.prototype.cornerColor = "blue";
      fabric.Object.prototype.cornerStyle = "circle";

      fabric.Object.prototype.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 16,
        cursorStyle: "pointer",
        mouseUpHandler: this.deleteObject,
        render: renderIcon,
        cornerSize: 24,
      });

      function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(img, -size / 2, -size / 2, size, size);
        ctx.restore();
      }
    },
    add(width = 81, height = 98, left = 114, top = 126) {
      var rect = new fabric.Rect({
        left,
        top,
        fill: "transparent",
        width,
        height,
        objectCaching: false,
        stroke: "red",
        strokeWidth: 4,
        hasControls: false,
        selectable: false
      });

      this.canvas.add(rect);
      this.canvas.setActiveObject(rect);
    },

    deleteObject(eventData, transform) {
      var target = transform.target;
      var canvas = target.canvas;
      canvas.remove(target);
      canvas.requestRenderAll();
    },
  },
};
</script>

<style lang="scss" scoped>
.draw-container {
  position: relative;
  .draw-div-item {
    position: absolute;
    z-index: 99;
    border: 2px solid red;
  }

  .draw-background {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 88;
  }
}
</style>
