<template>
  <el-dialog :visible="visible" title="故障详情" @close="$emit('on-change', false)">
    <el-scrollbar style="height: 100%">
      <WForm ref="roleForm" :form-data="formData" :columns="formColumnsDialog" label-width="100px" />
    </el-scrollbar>
    <div slot="footer" class="btn-grops" center>
      <el-button type="primary" class="button-linear" icon="el-icon-circle-check" @click="$emit('on-change', false)">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { cloneDeep } from "lodash-es";
import {WForm} from '@common-ui/w-form'
import {formColumnsDialog} from './config'
import {processStateObj} from '@/utils/config'
export default {
  components: {
    WForm
  },
  model: {
    prop: 'visible',
    event: 'on-change'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      formData: {},
      formColumnsDialog
    }
  },
  methods: {
    show(row) {
      const { deviceName, error, reportTime, status } = row || {};
      this.formData = cloneDeep({
        deviceName,
        error,
        reportTime,
        status:processStateObj[status],
      });
    },
  }
}
</script>
<style lang="scss" scoped>
::v-deep{
    .el-dialog__body{
      padding: 30px px2rem(60);
    }
}
</style>