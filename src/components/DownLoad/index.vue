<template>
  <div class="download" :style="{ width: show ? '25vw' : '0' }">
    <div class="download__inner">
      <div class="collapse-arrow" @click="show = !show">
        下载
      </div>
      <div class="download__body">
        <span
          v-if="!downloadingList.length"
          style="
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
          "
        >暂无下载</span>
        <div v-for="(item, i) in downloadingList" :key="i" class="download__item">
          <div class="title">
            <div class="title-text">
              {{ item.filename }}
            </div>
            <el-link type="danger" @click="item.cancel">
              删除
            </el-link>
          </div>
          <el-progress
            v-if="item.status == 'downloading'"
            color="#0aa198"
            :text-inside="true"
            :stroke-width="14"
            :percentage="item.process"
            status="success"
          />
          <span v-if="item.status == 'error'" style="color: #fff; font-size: 14px;">下载失败</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  computed: {
    downloadingList() {
      return this.$store.state.downLoad.downloadingList;
    }
  }
};
</script>

<style lang="scss" scoped>
.download {
  position: absolute;
  width: 25vw;
  height: 13vh;
  right: 0;
  top: 65vh;
  border: 1px solid #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
  .download__inner {
    width: 100%;
    height: 100%;
    position: relative;
    background: #04102a;
    .download__body {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      padding: 0 5px;
      .download__item {
        display: flex;
        flex-direction: column;
        padding: 5px 0;
        width: 100%;
        border-bottom: 1px solid #bababa;
        box-sizing: border-box;
        .title {
          width: 100%;
          padding: 5px 0;
          display: flex;
          justify-content: space-between;
          .title-text {
            width: 75%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            color: #fff;
            font-size: 14px;
          }
        }
      }
    }
    .collapse-arrow {
      width: 24px;
      height: 52px;
      left: -24px;
      position: absolute;
      background-color: #063570;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 4px;
    }
  }
}
</style>
