<template>
  <div class="rewrite_home">
    <div class="rewrite_home-header">
      <TrainNumber :count="dataInfo ? dataInfo.taskCount : '0'" />
      <AlarmCount :options="countOption" />
      <AlarmDistribution :options="distributionOption" />
      <AlarmTips :tips-list="tipsList" />
    </div>
    <div class="rewrite_home-center">
      <AlarmDetail :defect-vo-list="detailList" />
    </div>
    <div class="rewrite_home-footer">
      <RecheckStatus />
      <AlarmHistory />
    </div>
  </div>
</template>

<script>
import TrainNumber from './components/TrainNumber.vue'
import AlarmCount from './components/AlarmCount.vue'
import AlarmDistribution from './components/AlarmDistribution.vue'
import AlarmTips from './components/AlarmTips.vue'
import AlarmDetail from './components/AlarmDetail'
import RecheckStatus from './components/RecheckStatus'
import AlarmHistory from './components/AlarmHistory'
import { barOption, pieOption } from './components/chartConfig'
import { getHometData } from '@/api/interface/modules/home'

export default {
  components: {
    TrainNumber,
    AlarmCount,
    AlarmDistribution,
    AlarmTips,
    AlarmDetail,
    RecheckStatus,
    AlarmHistory
  },

  data () {
    return {
      dataInfo: null,
      // 报警数量配置
      countOption: {},
      // 报警分布配置
      distributionOption: {},
      // 报警提示列表
      tipsList: [],
      // 详情列表
      detailList: []
    }
  },

  mounted () {
    this.handleGetData()
  },

  methods: {

    async handleGetData () {
      const { data } = await getHometData()
      this.dataInfo = data
      this.countOption = barOption(data.itemTodayVoList)
      this.distributionOption = pieOption(data.itemTodayVoList)
      this.tipsList = data.defectRecentVoList || []
      console.log(data);
      this.detailList = data.defectTodayVoList || []
    }
  }
}
</script>

<style scoped lang='scss'>
  .rewrite_home {
    padding: 22px;

    &-header {
      display: flex;
      justify-content: space-between;
    }

    &-footer {
      display: flex;
      justify-content: space-between;
      margin-top: 32px;
    }
  }
</style>
