<template>
  <div class="robot-base-info">
    <WForm
      ref="Wform"
      label-width="100px"
      :form-data="formData"
      :columns="formColumns"
      :label-position="'top'"
      :rules="rules"
      size="mini"
    >
      <WCheckbox
        slot="failureAlarmOption"
        v-model="formData.failureAlarmOption"
        :options="formColumns[6].options"
      />
    </WForm>
  </div>
</template>

<script>
import { WForm } from '@common-ui/w-form';
import WCheckbox from './w-checkbox.vue';

export default {
  name: 'RobotDetailInfo',
  components: {
    WForm,
    WCheckbox,
  },
  model: {
    prop: 'detailInfo',
    event: 'change',
  },
  props: {
    detailInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      formStatus: 'create', // create、 edit
      formOriginData: null,
      formData: {
        speed: 3,
        maxSpeed: 5,
        batteryWarning: 20,
        batterySecure: 80,
        defectDetectAction: 'continue',
        obstacleAvoidDistance: 1,
        failureAlarmOption: 'VOICE',
      },
      rules : {
        speed: [
          { required: true, message: '机器人默认时速' }
        ],
        maxSpeed: [
          { required: true, message: '机器人最高时速' }
        ],
        batteryWarning: [
          { required: true, message: '电池报警电量不能为空' }
        ],
        batterySecure: [
          { required: true, message: '充足电量不能为空' }
        ],
        defectDetectAction: [
          { required: true, message: '检查到缺陷操作不能为空' }
        ],
        obstacleAvoidDistance: [
          { required: true, message: '避障距离不能为空' }
        ],
        failureAlarmOption: [
          { required: true, message: '故障警告方式不能为空' }
        ]
      },
    };
  },
  computed: {
    formColumns() {
      return [
        {
          label: '机器人默认时速(km/s)',
          prop: 'speed',
          el: 'input-number',
          required: true,
          clearable: true,
          max: 5,
          min: 1,
          step: 0.1,
          precision: 1,
        },
        {
          label: '机器人最高时速(km/s)',
          prop: 'maxSpeed',
          el: 'input-number',
          required: true,
          clearable: true,
          max: 15,
          min: 1,
          step: 0.1,
          precision: 1,
        },
        {
          label: '电池报警电量(%)',
          prop: 'batteryWarning',
          el: 'input-number',
          required: true,
          clearable: true,
          span: 11,
          max: 100,
          min: 0,
          step: 1,
        },
        {
          label: '电池充足电量(%)',
          prop: 'batterySecure',
          el: 'input-number',
          required: true,
          clearable: true,
          span: 11,
          max: 100,
          min: 0,
          step: 1,
        },
        {
          label: '避障距离(m)',
          prop: 'obstacleAvoidDistance',
          el: 'input-number',
          required: true,
          clearable: true,
          span: 11,
          max: 2,
          min: 1,
          step: 0.1,
          precision: 1,
        },
        {
          label: '检测到缺陷操作',
          prop: 'defectDetectAction',
          el: 'select',
          options: [
            { label: '继续前进', value: 'CONTINUE' },
            { label: '暂停行进', value: 'STOP' },
          ],
          required: true,
          clearable: true,
          span: 11,
        },
        {
          label: '故障警告方式',
          prop: 'failureAlarmOption',
          options: [
            { label: '声音', value: 'VOICE' },
            { label: '震动', value: 'VIBRATION' },
            { label: '短信', value: 'SMS' },
          ],
          required: true,
          clearable: true,
          span: 24,
        },
      ];
    },
  },
  watch: {
    detailInfo: {
      immediate: true,
      handler: function (value) {
        if (value && value.speed) {
          let { failureAlarmOption,...OtherValue } = value
          this.formData = {
            failureAlarmOption: failureAlarmOption.join(','),
            ...OtherValue
          }
        }
      },
    },
  },
  methods: {
    // 提交数据
    async checkForm() {
      return new Promise((resolve, reject) => {
        this.$refs.Wform.validate()
          .then(() => {
            let { failureAlarmOption, ...OtherValue } = this.formData
            let returnData = {
              failureAlarmOption: failureAlarmOption.split(','),
              ...OtherValue
            }
            this.$emit('change', returnData);
            console.log('detailInfo success');
            resolve();
          })
          .catch((error) => {
            console.log('detailInfo error', this.formData);
            reject();
          });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.robot-base-info {
  form {
    justify-content: space-between;
    ::v-deep {
      .el-input-number {
        width: 100%;
      }
    }
  }
}
</style>
