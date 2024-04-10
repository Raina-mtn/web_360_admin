<template>
  <PageLayout>
    <div class="config">
      <WForm
        ref="Wform"
        class="config-wform"
        label-width="100px"
        :form-data="formData"
        :columns="formColumns"
        :label-position="'top'"
        size="mini"
      />
      <el-button class="submit-btn" size="mini" type="primary" @click="submit">
        提交
      </el-button>
    </div>
  </PageLayout>
</template>

<script>
import { getSystemSettingList, updateSystemSettingList } from '@/api/interface/modules/system/system';
import { WForm } from '@common-ui/w-form';
import PageLayout from '@/components/page-layout/index.vue';

export default {
  components: {
    WForm,
    PageLayout,
  },
  data() {
    return {
      formData: {},
      formColumns: [
        {
          label: '公司名称',
          prop: 'env_company',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
          rules: [{ required: true, message: '公司名称不能为空' }],
        },
        {
          label: '站点名称',
          prop: 'env_site',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
          rules: [{ required: true, message: '站点名称不能为空' }],
        },
        {
          label: '资源存放路径',
          prop: 'data_resource_path',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
          rules: [{ required: true, message: '资源存放路径不能为空' }],
        },
        {
          label: '日志存放路径',
          prop: 'data_log_path',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
          rules: [{ required: true, message: '日志存放路径不能为空' }],
        },
        {
          label: '资源保存天数(天)',
          prop: 'data_resource_keepDays',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
          rules: [{ required: true, message: '资源保存天数不能为空' }],
        },
        {
          label: '通信端口',
          prop: 'server_port',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
          rules: [{ required: true, message: '通信端口不能为空' }],
        },
        {
          label: '心跳间隔时间(毫秒)',
          prop: 'server_heartbeat_interval',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
          rules: [{ required: true, message: '心跳间隔时间不能为空' }],
        },
        {
          label: '链接超时时间(毫秒)',
          prop: 'server_timeout',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
          rules: [{ required: true, message: '链接超时时间不能为空' }],
        },
        {
          label: '响应失败重试(次)',
          prop: 'server_request_retry',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
          rules: [{ required: true, message: '链接超时时间不能为空' }],
        },
        {
          label: '任务线程数',
          prop: 'server_thread_count',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
          rules: [{ required: true, message: '任务线程数不能为空' }],
        },
        {
          label: '是否通知',
          prop: 'system_notify',
          el: 'select',
          options: [
            { label: '是', value: 'ON' },
            { label: '否', value: 'OFF' },
          ],
          required: true,
          clearable: true,
          span: 11,
          rules: [{ required: true, message: '是否通知不能为空' }],
        },
      ],
    };
  },
  mounted() {
    getSystemSettingList().then(({ data }) => {
      let formObject = {};
      data.map(({ key, value }) => {
        let newKey = key.split('.').join('_');
        formObject[newKey] = value;
      });
      this.formData = formObject;
    });
  },
  methods: {
    submit(){
      this.$refs.Wform.validate()
        .then(() => {
          console.log(this.formData)
          let configList = []
          for( let [key, value] of Object.entries(this.formData)){
            let newKey = key.split('_').join('.')
            configList.push({ 'key': newKey, value })
          }
          updateSystemSettingList({configList}).then(res => {
            this.$message.success('修改成功')
          })
        })
        .catch((error) => {
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.config {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  .config-wform {
    max-height: unset;
    justify-content: space-between;
  }
  .submit-btn {
    width: fit-content;
  }
}
</style>