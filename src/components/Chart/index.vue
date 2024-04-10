<!--
 * @Date: 2022-04-06 15:42:26
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-12-08 10:09:18
 * @FilePath: \web_360_admin\src\components\Chart\index.vue
-->
<template>
  <div style="height: calc(100%)">
    <div v-if="!nodata" :id="id" style="height: 100%; width: 100%" />
    <span
      v-else
      :style="{
        height: height,
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'space-around',
      }"
    >
      <img :src="nodataImg" :style="{ display: 'block', width: '10%' }">
    </span>
  </div>
</template>
<script>
import * as echarts from "echarts";
import resize from "./mixins/resize";
export default {
  mixins: [resize],
  props: {
    id: {
      type: String,
      require: true,
      default: "chart",
    },
    parentId: {
      type: String,
      require: true,
      default: "chart",
    },
    width: {
      type: String,
      default: "400px",
    },
    height: {
      type: String,
      default: "180px",
    },
    option: {
      type: Object,
      default: () => ({}),
    },
    nodata: Boolean,
  },
  data() {
    return {
      chart: null,
      nodataImg: require("@/assets/images/nodata.png"),
    };
  },
  watch: {
    option(val) {
      if (!this.chart) {
        return this.initChart();
      }
      this.chart.setOption(this.option);
    },
    nodata(val) {
      if (!val) {
        this.initChart();
      } else {
        if (!this.chart) {
          return;
        }
        this.chart.dispose();
        this.chart = null;
      }
    },
  },
  mounted() {
    this.initChart();
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.chart &&
          this.chart.resize({
            width: document.getElementById(this.parentId).clientWidth + "px",
          });
      });
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      if (!this.nodata) {
        this.$nextTick(() => {
          this.chart =
            this.chart || echarts.init(document.getElementById(this.id));
          if (Object.keys(this.option).length) {
            this.chart.setOption(this.option);
          }
          this.chart.on("click", (params) => this.$emit("pointSelect", params));
        });
      }
    },
  },
};
</script>
