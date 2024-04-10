<template>
  <PageLayout>
    <el-tabs v-model="activeName">
      <el-tab-pane label="线路数据" name="line">
        <LineTab />
      </el-tab-pane>
      <el-tab-pane label="车辆数据" name="vehicle">
        <VehicleTab />
      </el-tab-pane>
      <el-tab-pane label="风险等级设置" name="level">
        <LevelTab />
      </el-tab-pane>
    </el-tabs>
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/page-layout/index.vue'
import LineTab from './component/line.vue'
import LevelTab from './component/level.vue'
import VehicleTab from './component/vehicle.vue'
export default {
  components: {
    PageLayout,
    LineTab,
    LevelTab,
    VehicleTab,
  },
  data() {
    return {
      activeName:'line'
    }
  },
  methods:{
  }
}
</script>
<style lang="scss" scoped>
</style>