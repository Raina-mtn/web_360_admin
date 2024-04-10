<!--
 * @Date: 2023-11-28 16:12:57
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2023-12-01 16:48:48
 * @FilePath: \web_360_admin\src\views\home\components\AlarmCount.vue
-->
<template>
  <div class="alarm-count">
    <titleCom title-name="今日报警数量" :title-bg="require('@/assets/images/ic_home_alarmNumber.png')" />
    <div id="count" class="alarm-count_content">
      <Chart
        id="gradeChart"
        ref="gradeChart" 
        parent-id="count"
        width="90%"
        height="100%"
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
  .alarm-count {
    color: #fff;

    &_content {
      width: 526px;
      height: 168px;
      padding-top: 12px;
      background: #001344;
      margin-top: 10px;
    }
  }
</style>
