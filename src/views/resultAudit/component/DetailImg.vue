<!--
 * @Date: 2022-07-26 14:21:30
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-03-13 15:34:43
 * @FilePath: \web_360_admin\src\views\inspectManage\defect\component\DetailImg.vue
-->
<template>
  <div class="outer-container" :style="{ height: `${height}px` }">
    <div
      id="test-container"
      ref="test-container"
      class="img-container"
      :style="{ height: `${height}px` }"
      @scroll="scroll"
    >
      <div
        class="detail-inner"
        :style="{ width: `${cpuWidth}px`, height: `${cpuHeight}px` }"
        @dragstart.prevent
      >
        <div class="img-container-list" :style="{ height: `${height}px` }">
          <LazyImg
            v-for="(item, index) in imgList"
            :key="index"
            :window-position="windowPosition"
            :width="item.pixelX * rate * cpuZoomVal"
            :height="item.pixelY * rate * cpuZoomVal"
            :start-position="
              (imgList
                .slice(0, index + 1)
                .map((imgItem) => imgItem.pixelX)
                .reduce((prev, cur, index, arr) => cur + prev, 0) -
                item.pixelX) *
                rate *
                cpuZoomVal
            "
            :src="item[urlKey]"
          />
        </div>
        <div class="sign-container-list">
          <div
            ref="sign-container"
            class="sign-container-inner"
            :style="{ 'pointer-events': !cpuEdit ? 'none' : 'unset' }"
          >
            <SignItemBorder
              v-if="signDiv"
              :rate="rate"
              :total-width="imgOriginWidth"
              :total-height="imgOriginHeight"
              :start-point-x="signDiv.startPointX"
              :start-point-y="signDiv.startPointY"
              :width="signDiv.width"
              :height="signDiv.height"
              :zoom-val="cpuZoomVal"
            />
            <SignItem
              v-for="(item, index) in innerSignDivList"
              :ref="`SignItem_${item.uid}`"
              :key="item.uid"
              :rate="rate"
              :total-width="imgOriginWidth"
              :total-height="imgOriginHeight"
              :sign-data.sync="innerSignDivList[index]"
              :zoom-val="cpuZoomVal"
              @deleteDefect="deleteDefect"
              @updateDefect="updateDefect"
              v-on="$listeners"
            />
          </div>
        </div>
      </div>
    </div>
    <DetailDialog ref="dialog" />
  </div>
</template>
<script>
import LazyImg from "./LazyImg";
import SignItem from "./SignItem";
import SignItemBorder from "./SignItemBorder.vue";
import { cloneDeep, uniqueId, difference } from "lodash-es";
import DetailDialog from "./detailDialog.vue";

export default {
  inject: ["getActiveUid"],
  components: {
    LazyImg,
    SignItem,
    SignItemBorder,
    DetailDialog,
  },
  props: {
    rate: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 0,
    },
    imgOriginWidth: {
      type: Number,
      default: 0,
    },
    imgOriginHeight: {
      type: Number,
      default: 0,
    },
    imgList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    urlKey: {
      type: String,
      default: "",
    },
    signDivList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    edit: {
      type: Boolean,
      default: false,
    },
    zoomOptions: {
      type: Object,
      default: function () {
        return {};
      },
    },
    scrollRate: {
      type: Number,
      default: 0,
    },
    scrollTop: {
      type: Number,
      default: 0,
    },
    imgRate: {
      type: Number,
      default: 0,
    },
    offsetVal: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      innerScrollLeft: 0,
      innerScrollTop: 0,
      windowPosition: [],
      signDiv: null,
      innerSignDivList: [],
      isImportData: false,
      scrollOriginData: {
        scrollTop: 0,
        scrollLeft: 0
      }
    };
  },
  computed: {
    cpuEdit() {
      return this.edit;
    },
    cpuZoomVal() {
      return this.zoomOptions.zoomVal;
    },
    cpuScrollRate() {
      return this.scrollRate;
    },
    cpuScrollTop() {
      return this.scrollTop;
    },
    cpuWidth() {
      return this.imgOriginWidth * this.rate * this.zoomOptions.zoomVal;
    },
    cpuHeight() {
      return this.imgOriginHeight * this.rate * this.zoomOptions.zoomVal;
    },
    cpuActiveUid() {
      return this.getActiveUid;
    },
  },
  watch: {
    async cpuZoomVal(val) {
      await this.$nextTick()
      this.isImportData = true
      this.setScrollByZoomVal();
    },
    cpuScrollRate(val) {
      this.isImportData = true
      this.setScrollByScrollRate(val);
    },
    cpuScrollTop(val) {
      this.isImportData = true
      this.setScrollByScrollTop(val);
    },
    cpuWidth(val) {
      this.setImgRate();
    },
    signDivList: {
      deep: true,
      immediate: true,
      handler(nVal, oVal) {
        if (!nVal || !nVal.length) {
          this.innerSignDivList = [];
          return;
        }
        let differenceList = difference(
          nVal,
          Array.from(this.innerSignDivList)
        );
        if (differenceList.length) {
          this.innerSignDivList = nVal;
        }
      },
    },
  },
  mounted() {
    this.scrollInit();
    this.setImgRate();
    this.scroll();
  },
  methods: {
    scroll(e) {
      let { scrollLeft, clientWidth, scrollTop, scrollWidth } = this.$refs["test-container"];
      
      let isScrollTop = scrollTop!== this.scrollOriginData.scrollTop;
      let isScrollLeft = scrollLeft!== this.scrollOriginData.scrollLeft;
      this.scrollOriginData = {scrollTop, scrollLeft}
    
      scrollTop = Math.floor(scrollTop * 100) / 100
      scrollLeft = Math.floor(scrollLeft * 100) / 100

      // 设置当前滚动距离
      this.windowEndPosition = scrollLeft + clientWidth + this.offsetVal;
      let lazyStart = scrollLeft - this.offsetVal < 0 ? 0 : scrollLeft - this.offsetVal;
      let lazyEnd = scrollLeft + clientWidth + this.offsetVal;
      this.windowPosition = [lazyStart, lazyEnd];

      // 如果是props触发，不发送数据
      if(this.isImportData){
        this.isImportData = false
        return 
      }

      // 设置滚动比
      if (scrollLeft !== this.innerScrollLeft && isScrollLeft) {
        console.log('水平滚动》》》》》》》》》》》》》》》》》》》')
        this.innerScrollLeft = scrollLeft;
        let scrollArea = scrollWidth - clientWidth;
        let scrollRate = Math.floor(scrollLeft / scrollArea * 100) / 100
        this.$emit("update:scrollRate", scrollRate);
      }

      // 设置顶部
      if (scrollTop !== this.innerScrollTop && isScrollTop) {
        console.log('垂直滚动》》》》》》》》》》》》》》》》》》》')
        this.innerScrollTop = scrollTop;
        this.$emit("update:scrollTop", scrollTop);
      }

      // 设置滚动中心
      // let winStart = scrollLeft;
      // let winEnd = scrollLeft + clientWidth
      // if(this.mouseX < winStart || this.mouseX > winEnd){
      //   let centerX = Math.round( scrollLeft + clientWidth / 2)
      //   this.$emit("update:mouseX", centerX);
      //   console.log('centerX', centerX,)
      // }
    },

    // 根据缩放调整位置 -- done
    async setScrollByZoomVal() {
      let node = this.$refs["test-container"];
      if (!node) {
        await this.$nextTick();
      }

      let { moveX, moveY } = this.zoomOptions;

      const calcScrollLeft = Math.floor((this.innerScrollLeft + moveX)* 100) / 100;
      let wantScrollLeft = calcScrollLeft >= 0 ? calcScrollLeft: 0
      if(wantScrollLeft != this.innerScrollLeft){
        console.log('setScrollByZoomVal wantScrollLeft>>>', wantScrollLeft, this.innerScrollLeft)
        this.$refs["test-container"].scrollLeft = wantScrollLeft;
        this.innerScrollLeft = wantScrollLeft;
      }

      const calcScrollTop = Math.floor((this.innerScrollTop + moveY)* 100) / 100;
      let wantScrolTop = calcScrollTop >= 0 ? calcScrollTop: 0
      if(wantScrolTop != this.innerScrollTop){
        console.log('setScrollByZoomVal wantScrolTop>>>', wantScrolTop, this.innerScrollTop)
        this.$refs["test-container"].scrollTop = wantScrolTop;
        this.innerScrollTop = wantScrolTop;
      }
    },

    // 根据比例设置滚动
    async setScrollByScrollRate(scrollRate) {
      let node = this.$refs["test-container"];
      if (!node) {
        await this.$nextTick();
      }
      if (scrollRate !== null) {
        let { clientWidth, scrollWidth } = this.$refs["test-container"];
        let scrollArea = scrollWidth - clientWidth;
        let newScrollLeft = Math.floor(scrollRate * scrollArea * 100) / 100;
        console.log("detail>>>>>>>>>,setScrollByScrollRate", this.innerScrollLeft,newScrollLeft);
        this.innerScrollLeft = newScrollLeft;
        this.$refs["test-container"].scrollLeft = newScrollLeft;
      }
    },

    // 根据scrollTop设置滚动
    async setScrollByScrollTop(scrollTop) {
      let node = this.$refs["test-container"];
      if (!node) {
        await this.$nextTick();
      }
      if (scrollTop != null) {
        this.$refs["test-container"].scrollTop = scrollTop;
        this.innerScrollTop = scrollTop;
      }
    },

    async setImgRate() {
      let node = this.$refs["test-container"];
      if (!node) {
        await this.$nextTick();
      }
      let { clientWidth } = this.$refs["test-container"];
      if (clientWidth) {
        let imgRate = Number(Number(clientWidth / this.cpuWidth).toFixed(2));
        this.$emit("update:imgRate", imgRate);
      }
    },

    // 初始化与绑定监听事件方法
    scrollInit() {
      // 获取要绑定事件的元素
      const nav = this.$refs["test-container"];
      var flag; // 鼠标按下
      var downX; // 鼠标点击的x下标
      var scrollLeft; // 当前元素滚动条的偏移量
      nav.addEventListener("mousedown", function (event) {
        flag = true;
        downX = event.clientX; // 获取到点击的x下标
        scrollLeft = this.scrollLeft; // 获取当前元素滚动条的偏移量
      });
      nav.addEventListener("mousemove", function (event) {
        if (flag) {
          // 判断是否是鼠标按下滚动元素区域
          var moveX = event.clientX; // 获取移动的x轴
          var scrollX = moveX - downX; // 当前移动的x轴下标减去刚点击下去的x轴下标得到鼠标滑动距离
          this.scrollLeft = scrollLeft - scrollX; // 鼠标按下的滚动条偏移量减去当前鼠标的滑动距离
        }
      });
      // 鼠标抬起停止拖动
      nav.addEventListener("mouseup", function () {
        flag = false;
      });
      // 鼠标离开元素停止拖动
      nav.addEventListener("mouseleave", function (event) {
        flag = false;
      });
    },

    // 创建框
    createSignDiv(type, position, taskId) {

      console.log("type", this.signDiv);
      this.$refs["sign-container"].onmousedown = (e) => {
        e.stopPropagation();
        this.darw(e,{type, position, taskId});
      };
    },

    // 画框
    darw(mousedownEv, { type, position, taskId }) {
      console.log("mousedownEv>>>>>>>>>>>>>", mousedownEv);
      let that = this;
      mousedownEv = mousedownEv || window.event;
      let starX = mousedownEv.pageX;
      let starY = mousedownEv.pageY;
      let signContainer = this.$refs["sign-container"];
      signContainer.onmousemove = function (ev) {
        ev.stopPropagation();
        ev = ev || window.event;
        let height = (ev.pageY - starY) / that.rate / that.cpuZoomVal;
        let width = (ev.pageX - starX) / that.rate / that.cpuZoomVal;
        if(height < 20  || width < 20 )return;
        
        that.signDiv = {
          taskId,
          position,
          type,
          startPointX: null,
          startPointY: null,
          width: null,
          height: null,
          uid: uniqueId(),
        };
        that.signDiv.startPointX = mousedownEv.offsetX / that.rate / that.cpuZoomVal;
        that.signDiv.startPointY = mousedownEv.offsetY / that.rate / that.cpuZoomVal;
        that.signDiv.width = width;
        that.signDiv.height = height;
      };
      signContainer.onmouseup = function (ev) {
        ev.stopPropagation();
        signContainer.onmousemove = null;
        signContainer.onmouseup = null;
        signContainer.onmousedown = null;
        if(that.signDiv.startPointX){
          let item = cloneDeep(that.signDiv);
          that.addDefect(item);
          that.signDiv = null;
          that.$emit("activeUidChange", item.uid);
          that.$nextTick(() => {
            console.log(that.$refs[`SignItem_${item.uid}`], item.uid);
            that.$refs[`SignItem_${item.uid}`][0].mode = "edit";
          });
        }
      };
    },

    // 删除缺陷
    deleteDefect(uid) {
      let index = this.innerSignDivList.findIndex((item) => item.uid === uid);
      this.innerSignDivList.splice(index, 1);
      let list = cloneDeep(this.innerSignDivList);
      this.$emit("update:signDivList", list);
    },

    // 添加缺陷
    addDefect(item) {
      this.innerSignDivList.push(item);
      let list = cloneDeep(this.innerSignDivList);
      this.$emit("update:signDivList", list);
    },

    // 更新缺陷
    updateDefect(defect) {
      let index = this.innerSignDivList.findIndex(
        (item) => item.uid === defect.uid
      );
      this.innerSignDivList.splice(index, 1, defect);
      let list = cloneDeep(this.innerSignDivList);
      this.$emit("update:signDivList", list);
    },

    // 打开弹框
    showDialog(editData, originData){
      return  this.$refs.dialog.show({editData, originData})
    }
  },
};
</script>
<style lang="scss" scoped>
.outer-container {
  width: 100%;
  overflow: hidden;
  .img-container {
    width: 100%;
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 20px;
      height: 100%;
      background: #fff;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background: rgba(0, 0, 0, 0.2);
    }

    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
    .detail-inner {
      position: relative;
    }
    .img-container-list {
      display: flex;
      width: fit-content;
      position: relative;
    }
    .sign-container-list {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 99;
      .sign-container-inner {
        width: 100%;
        height: 100%;
        position: relative;
        .signDiv {
          position: absolute;
          z-index: 999;
          pointer-events: none;
        }
      }
    }
  }
}
</style>
