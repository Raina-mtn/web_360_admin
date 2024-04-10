<!--
 * @Date: 2022-07-26 14:21:30
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-12-01 10:56:43
 * @FilePath: \web_360_admin\src\views\resultAudit\component\MarkList.vue
-->
<template>
  <div class="signList">
    <div
      v-for="(item, index) in cpuSignDivList"
      :key="index"
      :style="{
        background: `${cpuActiveUid == item.uid? 'red': '#0091ff'}`,
        zIndex: `${cpuActiveUid == item.uid? 99: 0}`,
        top: `${(item.startPointY / imgOriginHeight) * 70}% `,
        left: `${(item.startPointX / imgOriginWidth) * 100}%`,
      }"
      class="markPoint"
      @click.stop="choose(item.uid)"
    />
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
    signDivList: {
      type: Array,
      default: function () {
        return [];
      },
    },
    activeUid: {
      type: String,
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {
    cpuSignDivList() {
      return this.signDivList;
    },
    cpuActiveUid() {
      return this.activeUid;
    },
  },
  methods: {
    choose(uid) {
      this.$emit("markClick", uid);
    },
  },
};
</script>
<style lang="scss" scoped>
.signList {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 8;
  pointer-events: none;
  .markPoint {
    pointer-events: auto;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    position: absolute;
    left: 100px;
  }
}

div::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 0; /*高宽分别对应横竖滚动条的尺寸*/
  height: 0;
}

div::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background: rgba(196, 178, 23, 0.466);
}

div::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 0;
  // background: url("~@/assets/images/pic_subway.png");
  // background-size: 100% 100%;
  // background-repeat: no-repeat;
}
</style>
