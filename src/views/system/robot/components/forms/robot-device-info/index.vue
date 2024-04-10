<template>
  <div class="robot-base-info">
    <el-form ref="deviceForm" :model="formData">
      <DeviceItem
        v-for="(inputItem, index) in formData.values"
        :key="inputItem.componentId"
        v-model="inputItem.parameters"
        :index="index"
        :settings="inputItem.settings"
        :name="`${inputItem.name} - ${inputItem.deviceType}`"
      />
    </el-form>
  </div>
</template>

<script>
import DeviceItem from './component/form.vue';

export default {
  name: 'RobotDeviceInfo',
  components: {
    DeviceItem,
  },
  model: {
    prop: 'deviceTypeInfo',
    event: 'change',
  },
  props: {
    deviceTypeInfo: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      formStatus: 'create', // create、 edit
      formOriginData: null,
      formData: { values: [] },
      resolve: null,
      reject: null,
    };
  },
  computed: {
    getDeviceTypeInfo() {
      return this.deviceTypeInfo;
    },
  },
  watch: {
    getDeviceTypeInfo: {
      immediate: true,
      handler: function (value) {
        this.formData.values = value && value.length > 0 ? value : [];
      },
    },
  },
  mounted() {
    this.$EventBus.$on('modelChange', (componentList) => {
      this.formData.values = componentList.map((item) => {
        const { deviceType, id: componentId, settings = null, name } = item;
        let valueItem = this.getDeviceTypeInfo.find(item => item.componentId === componentId)
        return {
          name,
          componentId,
          deviceType,
          settings,
          memo: '',
          parameters:valueItem? valueItem.parameters: null
        };
      });
    });
  },
  methods: {
    // 提交数据
    async checkForm() {
      return new Promise((resolve, reject) => {
        this.$refs.deviceForm
          .validate()
          .then(() => {
            this.$emit('change', this.formData.values);
            resolve();
          })
          .catch((error) => {
            console.log('deviceInfo error', this.formData);
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
