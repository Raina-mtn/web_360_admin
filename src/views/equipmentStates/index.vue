<template>
  <PageLayout>
    <div class="bg">
      <PowerOff style="width: 150px;position: absolute;right: 100px; top: 130px" />
      <div class="warpper">
        <div class="warpper_top">
          <MarkingCom
            v-for="item in moduleStatus_top"
            :key="item.name"
            :name="moduleData[item.code]"
            :position="item.position"
            :status="statusData[item.code]"
            :time="timeData[item.code]"
          />
        </div>
        <div class="warpper_center">
          <div class="left">
            <MarkingCom
              v-for="item in moduleStatus_left"
              :key="item.name"
              :name="moduleData[item.code]"
              :position="item.position"
              :status="statusData[item.code]"
              :time="timeData[item.code]"
            />
          </div>
          <div class="center">
            <div class="pic_metro" />
          </div>
          <div class="right">
            <MarkingCom
              v-for="item in moduleStatus_right"
              :key="item.name"
              :name="moduleData[item.code]"
              :position="item.position"
              :status="statusData[item.code]"
              :time="timeData[item.code]"
            />
          </div>
        </div>
        <div class="wrapper_bottom">
          <MarkingCom
            v-for="item in moduleStatus_bottom"
            :key="item.name"
            :name="moduleData[item.code]"
            :position="item.position"
            :status="statusData[item.code]"
            :time="timeData[item.code]"
          />
        </div>
      </div>
    </div>
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/page-layout/index.vue'
import MarkingCom from './components/marking.vue';
import { getModuleList } from '@/api/interface/index';
import { moduleStatus_top, moduleStatus_left, moduleStatus_right, moduleStatus_bottom, } from './config.js'
import PowerOff from './components/powerOff.vue';
export default {
  components: {
    PageLayout,
    MarkingCom,
    PowerOff
  },
  data() {
    return {
      moduleData: [],
      statusData: [],
      timeData: [],
      params: {
        deviceId: '1',
        type: 2
      },
      moduleStatus_top,
      moduleStatus_left,
      moduleStatus_right,
      moduleStatus_bottom,
    }
  },
  computed: {
    getData() {
      return this.$store.state.moduleStatus.data;
    },
  },
  watch: {
    getData: {
      handler(data) {
        this.moduleData = this.arrToObj(data, { key: "code", label: "name" });
        this.statusData = this.arrToObj(data, { key: "code", label: "status" });
        this.timeData = this.arrToObj(data, { key: "code", label: "updateTime" });
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.getList()
    this.$store.dispatch("moduleStatus/polling", this.params);
  },
  beforeDestroy() {
    clearTimeout(this.$store.state.moduleStatus.timer)
  },
  methods: {
    getList() {
      getModuleList(this.params).then(res => {
        this.moduleData = res.data
      })
    },
    arrToObj(arr, format = { key: "value", label: "label" }) {
      return arr.reduce(function (acc, cur) {
        const curkey = cur[format.key];
        acc[curkey] = cur[format.label];
        return acc;
      }, {});
    },
  },

}
</script>
<style lang="scss" scoped>
.bg {
  height: 100%;
  width: 100%;
  min-width: 1100px;
  min-height: 700px;
  background: url('~@/assets/images/bg_inline_state.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;

  .warpper {
    height: 80%;
    width: 50%;
    min-width: 600px;
    min-height: 300px;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    top: 5%;
    left: 1%;

    .warpper_top {
      width: 95%;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .warpper_center {
      height: 80%;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .left,
      .right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        position: relative;
        top: 20%;
        z-index: 999;
      }

      .left {
        left: -10%;
      }

      .right {
        left: 9%;
      }

      .center {
        width: 100%;
        height: 100%;
        display: flex;

        .pic_metro {
          margin: auto;
          width: 60%;
          height: 90%;
          background: url('~@/assets/images/pic_metro.png') no-repeat;
          background-size: 100% 100%;
        }
      }
    }

    .wrapper_bottom {
      width: 100%;
      text-align: center;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      translate: 0 50%;
    }
  }
}</style>
