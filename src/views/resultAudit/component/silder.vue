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
            width: `${imgWidth}px`,
            height: '1px',
            backgroundColor: 'tranparent',
          }"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
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
    signDivList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    scrollRate: {
      type: Number,
      default: 0,
    },
    imgRate: {
      type: Number,
      default: 0,
    },
    activeUid: {
      type: String,
      default: null,
    },
    zoomOptions: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      innerScrollLeft: 0,
      signDiv: null,
      imgWidth: null,
      isImportData: false
    };
  },
  computed: {
    cpuSignDivList() {
      return this.signDivList;
    },
    cpuZoomVal() {
      return this.zoomOptions.zoomVal;
    },
    cpuScrollRate() {
      return this.scrollRate;
    },
    cpuImgRate() {
      return this.imgRate;
    },
    cpuActiveUid() {
      return this.activeUid;
    },
  },
  watch: {
    cpuZoomVal(val) {
      this.isImportData = true
      this.setScrollByZoomVal();
    },
    cpuScrollRate(val) {
      this.isImportData = true
      this.setScrollByScrollRate(val);
    },
    cpuImgRate: {
      immediate: true,
      handler(val) {
        this.setImgWidth(val);
      },
    },

  },
  mounted() {
    this.setSlider();
  },
  methods: {
    scroll(e) {
      let { scrollLeft, clientWidth, scrollWidth } = e.target;
      scrollLeft = Math.floor(scrollLeft * 100) / 100

      // 如果是props触发，不发送数据
      if(this.isImportData){
        this.isImportData = false
        return 
      }

      // 设置滚动比
      if(scrollLeft !== this.innerScrollLeft){
        this.innerScrollLeft = scrollLeft;
        let scrollArea = scrollWidth - clientWidth;
        let scrollRate = Number(Number(scrollLeft / scrollArea).toFixed(2));
        this.$emit("update:scrollRate", scrollRate);
      }
    },

    // 根据缩放调整位置
    async setScrollByZoomVal() {
      let node = this.$refs["test-container"];
      if (!node) {
        await this.$nextTick();
      }

      let { moveX } = this.zoomOptions;
      let wantScrollLeft = Math.floor((this.innerScrollLeft + moveX )* 100) / 100

      if(wantScrollLeft != this.innerScrollLeft){
        console.log('setScrollByZoomVal wantScrollLeft>>>', wantScrollLeft, this.innerScrollLeft)
        this.$refs["test-container"].scrollLeft = wantScrollLeft;
        this.innerScrollLeft = wantScrollLeft;
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
        this.innerScrollLeft = newScrollLeft;
        this.$refs["test-container"].scrollLeft = newScrollLeft;
      }
    },

    setSlider() {
      this.$nextTick(() => {
        let { offsetWidth } = this.$refs["test-container"];
        this.rate = offsetWidth / this.imgOriginWidth;
      });
    },

    // 设置图片宽度
    async setImgWidth(imgRate) {
      let node = this.$refs["test-container"];
      if (!node) {
        await this.$nextTick();
      }
      if (imgRate) {
        let { offsetWidth } = this.$refs["test-container"];
        this.imgWidth = offsetWidth / imgRate;
      }
    },

    // 滚到到指定的标记点
    scrollToMark(uid) {
      let item = this.signDivList.find((item) => item.uid == uid);
      if(!item)return;
      this.$nextTick(() => {
        let { scrollWidth, clientWidth } = this.$refs["test-container"];
        console.log('scrollToMark',scrollWidth )

        // 获取原始图片和点位的比例
        let positionRate = item.startPointX / this.imgOriginWidth;

        // 获取当前框中的起始位置
        let markStartPostion = positionRate * scrollWidth

        // 设置为框的中间位置
        let markCenter = markStartPostion - clientWidth / 2

        let scrollLeft = markCenter > 0?  Math.floor(markCenter): 0;
        this.$refs["test-container"].scrollLeft = scrollLeft;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.slider-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 7;
  background-color: 'tranparent';
  .img-container {
    width: 100%;
    overflow-x: scroll;
    background-color: 'tranparent';
    .img-container-list {
      display: flex;
      width: fit-content;
      height: fit-content; // 和rate里面的高度一致
      background-color: 'tranparent'
    }
  }
}

div::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: inherit;
  background-color: 'tranparent';
}

div::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background:#011243;
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
