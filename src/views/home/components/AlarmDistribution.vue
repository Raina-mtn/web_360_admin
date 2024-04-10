<!--
 * @Date: 2023-11-28 16:12:57
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-12-01 16:46:52
 * @FilePath: \web_360_admin\src\views\home\components\AlarmDistribution.vue
-->
<template>
  <div class="alarm-distribution">
    <titleCom title-name="今日报警分布" :title-bg="require('@/assets/images/ic_home_alarmDistribution.png')" />
    <div id="parentDistribution" class="alarm-distribution_content">
      <Chart
        id="distribution"
        ref="distribution" 
        parent-id="parentDistribution"
        width="90%"
        height="90%"
        :option="countOption"
        :nodata="!countOption"
      />
    </div>
  </div>
</template>

<script>
import titleCom from './title.vue'
import Chart from '@/components/Chart/index.vue'
export default {
  components: {
    titleCom,
    Chart
  },

  props: {
    options: {
      type: Object,
      default: () => {
        return null
      }
    }
  },

  data () {
    return {
      countOption: null,
    }
  },

  watch: {
    options: {
      deep: true,
      handler (val) {
        this.countOption = {...val}
      }
    }
  },

  created () {

  },

  methods: {

  }
}
</script>

<style scoped lang='scss'>
  .alarm-distribution {
    color: #fff;

    &_content {
      width: 306px;
      height: 168px;
      background: #001344;
      margin-top: 10px;
      padding-left: 24px;
      padding-top: 24px;
    }
  }
</style>
