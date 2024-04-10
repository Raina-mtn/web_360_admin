<!--
 * @Date: 2022-12-05 15:59:07
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-09-12 15:56:25
 * @FilePath: \web_360_admin\src\views\inspectManage\resultAudit\component\zoom.vue
-->
<template>
  <div class="viewer">
    <div class="normal">
      <div class="normal_title">
        <div class="title">
          正常图
        </div>
      </div>
      <div
        class="view-item"
        @mousewheel="mousewheel"
        @mousemove.prevent="mouseMove"
      >
        <div
          ref="container-zoom-1"
          class="view-item-container"
          :style="{ cursor: cursorType }"
        >
          <slot name="zoom-1" />
        </div>
      </div>
    </div>
    <div class="compare">
      <div class="compare_title">
        <div class="title">
          对比图
        </div>
      </div>
      <div
        class="view-item"
        @mousewheel.prevent="mousewheel"
        @mousemove.prevent="mouseMove"
      >
        <div
          ref="container-zoom-2"
          class="view-item-container"
          :style="{ cursor: cursorType }"
        >
          <slot name="zoom-2" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { debounce } from "lodash-es";
export default {
  props: {
    zoomVal: {
      type: Number,
      default: 1,
    },
    mouseX: {
      type: Number,
      default: 0,
    },
    mouseY: {
      type: Number,
      default: 0,
    },
    scrollTop: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      imgs: [],
      params: {
        //用于计算图片的缩放，位置等
        originX: 0,
        originY: 0,
      },
      cursorType: "e-resize",
      zoomIn: require("@/assets/images/zoom_in.png"),
      zoomOut: require("@/assets/images/zoom_out.png"),
    };
  },
  computed: {
    cpuZoomVal() {
      return this.zoomVal;
    },
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$nextTick(() => {
        this.imgs = [
          this.$refs["container-zoom-1"],
          this.$refs["container-zoom-2"],
        ];
        let { clientWidth, clientHeight } =
          document.getElementsByClassName("view-item")[0];
        this.imgs.forEach((img) => {
          img.style.left = (clientWidth - img.width) / 2 + "px";
          img.style.top = (clientHeight - img.heighth) / 2 + "px";
          img.style.right = "none";
          img.style.right = "none";
          img.style.margin = "inherit";
        });
      });
    },
    mouseMove(e) {
      let { originX, originY } = this.getOriginPoint(
        e.offsetX,
        e.offsetY,
        this.zoomVal
      );
      this.params.originX = originX;
      this.params.originY = originY;
      this.$emit("change", { mouseX: originX, mouseY: originY });
    },
    mousewheel(e) {
      if (e.wheelDelta || e.detail) {
        // 滚动缩放
        if (e.altKey) {
          let moveX, moveY;
          let wheelVal = e.wheelDelta / 1200;

          // 获取滚动的xy距离
          let { originX, originY } = this.params;
          moveX = originX * wheelVal;
          moveY = originY * wheelVal;

          // 设置放大值
          let setZoomVal = this.cpuZoomVal + wheelVal;
          let zoomVal = Number((setZoomVal < 1 ? 1 : setZoomVal).toFixed(2));

          this.$emit("change", { moveX, moveY, zoomVal });

          // 设置光标
          if (wheelVal > 0) {
            this.cursorType = `url(${this.zoomIn}),auto`;
          } else {
            this.cursorType = `url(${this.zoomOut}),auto`;
          }

          this.resetCusor();
          return;
        }

        // 普通滚动
        // let wheelVal = e.wheelDelta / 120;
        // let { clientHeight, scrollHeight, scrollTop } = document.getElementById("test-container");
        // let scrollTopOffSet = Math.floor((scrollTop + wheelVal) * 100) / 100;
        // let min = 0;
        // let max = scrollHeight - clientHeight;
        // if (scrollTopOffSet < max && scrollTopOffSet > min) {
        //   console.log("zoom scrollTopOffSet>>>>>", scrollTopOffSet);
        //   this.$emit("update:scrollTop", scrollTopOffSet);
        // }
      }
    },

    resetCusor: debounce(async function () {
      this.cursorType = "e-resize";
    }, 300),

    // 获取原始鼠标位置
    getOriginPoint(x, y, zoomVal) {
      let originX = x;
      let originY = y;
      if (zoomVal > 1) {
        originX = Math.floor(x / this.zoomVal);
        originY = Math.floor(y / this.zoomVal);
      }
      return { originX, originY };
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
    height: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;
    // margin: 10px 0;
    .view-item-container {
      position: absolute;
      max-height: 100%;
      max-width: 100%;
      margin: auto;
      top: 0;
      left: 0;
    }
  }

  .normal,
  .compare {
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    .title {
      color: #fff;
      font-size: 16px;
      position: relative;
      z-index: 1;
      padding-left: 30px;
    }
  }
  .normal .title {
    background: url("~@/assets/images/bg_nomarlPic.png") no-repeat;
  }

  .compare .title {
    background: url("~@/assets/images/bg_Comparison.png") no-repeat;
  }
}
</style>
