<!--
 * @Date: 2022-12-07 14:35:18
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-03-30 09:49:03
 * @FilePath: \web_360_admin\src\views\inspectManage\defect\component\SignItem.vue
-->
<template>
  <div
    ref="signContainer"
    v-loading="uploading"
    :style="{
      width: `${cpuWidth}px`,
      height: `${cpuHeight}px`,
      left: `${cpuStartPointX}px`,
      top: `${cpuStartPointY}px`,
      'z-index': cpuActiveUid == signData.uid ? '9999' : 'unset',
      border: cpuActiveUid == signData.uid ? '1px solid red' : '1px solid red',
      // background: `rgba(${
      //   type == 'MISTAKEN' ? '82, 196, 26' : '250, 173, 20'
      // }, 0.4)`,
    }"
    class="sign-container"
    @click="choose"
    @mousemove.stop
  >
    <div v-if="mode == 'edit'" class="inner">
      <div
        class="drag"
        @mousedown.stop="drag = true"
        @mouseout="darg = false"
        @mouseup.stop="drag = false"
        @mousemove.stop="dragMove"
      />
      <div
        class="resizeBtn"
        :style="{ 'padding': resize ? '100px': '0px'}"
        @mousedown.stop="resize = true"
        @mouseup.stop="resize = false"
        @mousemove.stop="resizeMove"
      >
        <img
          width="16px" 
          :src="require('@/assets/images/bottom-left.png')"
          alt=""
        >
      </div>
      <div class="btn-box" :style="cpuGetBtnBoxStyle">
        <div class="btn-item" @click="reset">
          <i class="el-icon-refresh-left" />
        </div>
        <div class="btn-item" @click="submit">
          <i class="el-icon-check" />
        </div>
        <div class="btn-item" @click="deleteDefect">
          <i class="el-icon-delete" />
        </div>
      </div>
    </div>
    <!-- <DetailDialog ref="dialog" /> --> 
  </div>
</template>

<script>
import { cloneDeep, isEmpty } from "lodash-es";
import {
  // createSignInfo,
  deleteSignInfo,
  // updateSignInfo,
} from "@/api/interface/index";
// import DetailDialog from "./detailDialog.vue";
export default {
  inject: ["getActiveUid"],
  components: {
    // DetailDialog,
  },
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
    signData: {
      type: Object,
      default: function () {
        return {};
      },
    },
    zoomVal: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      originData: null,
      width: 0,
      height: 0,
      startPointX: 0,
      startPointY: 0,
      type: "MISTAKEN",
      uploading: false,
      mode: null, // 'edit'
      drag: false,
      resize: false
    };
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
    cpuSignData() {
      return this.signData;
    },
    cpuZoomVal() {
      return this.zoomVal;
    },
    cpuActiveUid() {
      return this.getActiveUid();
    },
    cpuGetBtnBoxStyle() {
      let width = this.cpuWidth * 0.7 > 54 ? 54 : this.cpuWidth * 0.7;
      let height = this.cpuWidth / 4 > 18 ? 18 : this.cpuWidth / 4;
      return {
        width: `${width}px`,
        height: `${height}px`,
        top: `-${height}px`,
      };
    },
  },
  watch: {
    cpuSignData: {
      immediate: true,
      handler(val) {
        if (isEmpty(val)) {
          return;
        }
        if (val?.width) {
          this.width = val.width;
        }
        if (val?.height) {
          this.height = val.height;
        }
        if (val?.startPointX) {
          this.startPointX = val.startPointX;
        }
        if (val?.width) {
          this.startPointY = val.startPointY;
        }
        if (val?.type) {
          this.type = val.type;
        }
        this.originData = cloneDeep(val);
      },
    },
  },

  methods: {
    // 大小调整
    resizeMove(ev){
      if (!this.resize) return;
      let signContainer = this.$refs["signContainer"];
      let { offsetWidth, offsetHeight, offsetLeft, offsetTop } = signContainer;
      let { movementX, movementY } = ev;
      let width = offsetWidth + movementX;
      let setWidth;
      if (width < 5) {
        setWidth = 5;
      } else if (width > this.cpuTotalWidth - offsetLeft) {
        setWidth = this.cpuTotalWidth - offsetLeft;
      } else {
        setWidth = width;
      }
      if (setWidth) {
        this.width = setWidth / this.rate / this.zoomVal;
      }

      let height = offsetHeight + movementY;
      let setHeight;
      if (height < 5) {
        setHeight = 5;
      } else if (height > this.cpuTotalHeight - offsetTop) {
        setHeight = this.cpuTotalHeight - offsetTop;
      } else {
        setHeight = height;
      }
      if (setHeight) {
        this.height = setHeight / this.rate / this.zoomVal;
      }
    },

    // 拖动
    dragMove(ev) {
      if (!this.drag) return;
      let signContainer = this.$refs["signContainer"];
      let left = signContainer.offsetLeft;
      let top = signContainer.offsetTop;
      let { movementX, movementY } = ev;
      let startPointY = top + movementY;
      let setStartPointY;
      if (startPointY < 0) {
        setStartPointY = 0;
      } else if (startPointY + this.cpuHeight > this.cpuTotalHeight) {
        setStartPointY = this.cpuTotalHeight - this.cpuHeight;
      } else {
        setStartPointY = startPointY;
      }

      if (setStartPointY) {
        this.startPointY = setStartPointY / this.rate / this.zoomVal;
      }
      let startPointX = left + movementX;
      let setStartPointX;
      if (startPointX < 0) {
        setStartPointX = 0;
      } else if (startPointX + this.cpuWidth > this.cpuTotalWidth) {
        setStartPointX = this.cpuTotalWidth - this.cpuWidth;
      } else {
        setStartPointX = startPointX;
      }
      if (setStartPointX) {
        this.startPointX = setStartPointX / this.rate / this.zoomVal;
      }
    },

    // 重置
    reset() {
      let {
        width = 0,
        height = 0,
        startPointX = 0,
        startPointY = 0,
      } = this.originData;
      this.width = width;
      this.height = height;
      this.startPointX = startPointX;
      this.startPointY = startPointY;
    },

    // submit
    async submit() {
      let editData = {
        width: Number(this.width).toFixed(2).toString(),
        height: Number(this.height).toFixed(2).toString(),
        startPointX: Math.floor(this.startPointX),
        startPointY: Math.floor(this.startPointY),
      };

      let data  = this.$parent.showDialog(editData, this.originData)
  
      let updateData = cloneDeep(this.originData);
      Object.entries(data).map(([k, v]) => {
        if (v !== null && v !== undefined) {
          updateData[k] = v;
        }
      });
      this.$emit("updateDefect", updateData);
      this.$emit("activeUidChange", null);
    },

    // 删除
    async deleteDefect() {
      try {
        await this.$confirm("是否要删除该项", "提示", { type: "warning" });
        let { id, uid } = this.originData;
        if (id) {
          let isDeleted = (await deleteSignInfo({ id })).data;
          if (isDeleted) {
            this.$message.success("删除成功");
          }
        }
        this.$emit("deleteDefect", uid);
        // eslint-disable-next-line no-empty
      } catch (error) {}
    },

    choose(e) {
      let that = this;
      function handlerClick(e) {
        try {
          let isSelf = that.$refs[`signContainer`].contains(e.target); // 这个是自己的区域
          if (!isSelf) {
            that.$emit("activeUidChange", null);
            that.mode = null;
            document.removeEventListener("click", handlerClick);
            return;
          }
          that.$emit("activeUidChange", that.signData.uid);
          that.mode = "edit";
        } catch (error) {
          console.log('choose:>>>>',error)
            
        }
      }
      document.addEventListener("click", handlerClick);
    },
  },
};
</script>

<style lang="scss" scoped>
.sign-container {
  position: absolute;
  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #fff;
    .drag {
      cursor: move;
      width: 100%;
      height: 100%;
    }
    .resizeBtn {
      position: absolute;
      border-radius: 50%;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: nw-resize;
      transform: translateX(50%) translateY(50%);
      padding: 0;
      width: fit-content;
      height: fit-content;
    }

    .btn-box {
      left: -1px;
      position: absolute;
      display: flex;
      font-size: 5%;
      .btn-item {
        width: 33%;
        height: 100%;
        background: #fff;
        text-align: center;
        border-right: 1px solid rgb(121, 116, 116);
      }
    }
  }
}
</style>
