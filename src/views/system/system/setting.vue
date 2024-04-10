<template>
  <div class="common-container">
    <div class="content">
      <WForm :form-data="formData" :columns="formColumns" label-width="200px" />
    </div>
  </div>
</template>
<script>
import {WForm} from '@common-ui/w-form'
export default {
  components: {
    WForm
  },
  data() {
    return {
      formData:{},
      formColumns:[{
        label: '服务器上报开关',
        prop: 'switch',
        el: 'radio',
        dataList:[{label: '开', value: true}, {label: '关', value: false}],
        clearable: true,
        span: 14
      },{
        label: '缩略图比例',
        prop: 'ratio',
        el: 'select',
        placeholder: '请选择',
        clearable: true,
        span: 14
      },{
        label: '导出报表是否需要缩略图',
        prop: 'exportExcel',
        el: 'radio',
        dataList:[{label: '是', value: true}, {label: '否', value: false}],
        clearable: true,
        span: 14
      },{
        label: '资源存放时间',
        prop: 'time',
        el: 'select',
        placeholder: '请选择',
        clearable: true,
        span: 14
      },{
        label: '文件备份路径',
        prop: 'path',
        el: 'input',
        placeholder: '请输入文件备份路径',
        clearable: true,
        span: 14
      },{
        label: '数据备份周期',
        prop: 'regular',
        el: 'select',
        placeholder: '请选择',
        clearable: true,
        span: 14
      },]
    }
  },
}
</script>
<style lang="scss" scoped>
.content{
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  height: 100%;
}
</style>