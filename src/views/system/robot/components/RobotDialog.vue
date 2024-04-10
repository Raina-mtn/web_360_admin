<template>
  <div class="model-dialog">
    <el-drawer
      title="机器人型号"
      :destroy-on-close="true"
      :before-close="closeDialog"
      :visible.sync="isShow"
      center
    >
      <div v-if="isShow" class="scroll-box">
        <p class="title">
          基本信息
        </p>
        <RobotBaseInfo ref="RobotBaseInfo" v-model="formData.baseInfo" />
        <p class="title">
          详细信息
        </p>
        <RobotDetailInfo ref="RobotDetailInfo" v-model="formData.detailInfo" />
        <p class="title">
          设备信息
        </p>
        <RobotDeviceInfo ref="RobotDeviceInfo" v-model="formData.deviceTypeInfo" />
        <el-button type="primary" size="mini" @click="submit">
          提交
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import RobotBaseInfo from './forms/robot-base-info/index.vue';
import RobotDetailInfo from './forms/robot-detail-info/index.vue';
import RobotDeviceInfo from './forms/robot-device-info/index.vue';

import {
  getRobotInfo,
  createRobot,
  updateRobot,
  editRobotCommonSet,
  updateRobotDevice,
} from '@/api/interface/modules/system/robot-mangement.js';

export default {
  name: 'ModelDialog',
  components: {
    RobotBaseInfo,
    RobotDetailInfo,
    RobotDeviceInfo,
  },
  props: {
    robotList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isShow: false,
      formStatus: 'create', // create、 edit
      formOriginData: null,
      formData: {
        baseInfo: {},
        detailInfo: {},
        deviceTypeInfo: [],
      },
      resolve: null,
      reject: null,
    };
  },
  computed: {
    formColumns() {
      return [
        {
          label: '型号编码',
          prop: 'code',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
        },
        {
          label: '型号名称',
          prop: 'name',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
        },
        {
          prop: 'componentList',
          span: 24,
        },
        {
          prop: 'btns',
          span: 24,
        },
      ];
    },
  },
  methods: {
    // 打开对话框
    async openDialog({ type = 'create', dialogData = {} }) {
      console.log(type);
      return new Promise((resolve, reject) => {
        this.formStatus = type;
        if (type === 'edit') {
          let { id } = dialogData;
          getRobotInfo({ id, includeSetting: true }).then(({ data }) => {
            console.log(data);
            let { title, factoryNumber, func, desc, modelId, profile } = data;
            const baseInfo = { title, factoryNumber, func, desc, modelId, profile };

            const { settings } = data;
            const detailInfo = settings || {};

            const { deviceList: deviceTypeInfo } = data;
            let robotInfo = { baseInfo, detailInfo, deviceTypeInfo };
            this.formData = { ...robotInfo };
            this.formOriginData = { ...dialogData };
          });
        }

        this.resolve = resolve;
        this.reject = reject;
        this.isShow = true;
      });
    },

    // 关闭
    closeDialog() {
      this.reject();
      this.resetDialog();
    },

    // 重置dialog
    resetDialog() {
      this.isShow = false;
      this.formStatus = 'create';
      this.formOriginData = null;
      this.formData = {
        baseInfo: {},
        detailInfo: {},
        deviceTypeInfo: [],
      };
    },

    // 提交数据
    submit() {
      Promise.all([
        this.$refs.RobotBaseInfo.checkForm(),
        this.$refs.RobotDetailInfo.checkForm(),
        this.$refs.RobotDeviceInfo.checkForm(),
      ]).then(async (res) => {
        if (this.formStatus === 'create') {
          await this.create(this.formData);
        } else if (this.formStatus === 'edit') {
          await this.update();
        }
        this.resolve(true);
        this.resetDialog();
      });
    },

    // 创建
    async create(data) {
      const { baseInfo } = this.formData;
      let robotId = (await createRobot(baseInfo)).data;

      const { detailInfo } = this.formData;
      await editRobotCommonSet({ robotId, ...detailInfo });

      const { deviceTypeInfo: deviceList } = this.formData;
      await updateRobotDevice({ robotId, deviceList });
      this.$message.success('创建成功')
    },

    // 编辑
    async update() {
      let id = this.formOriginData.id;
      const { baseInfo } = this.formData;
      await updateRobot({ id, ...baseInfo });

      const { detailInfo } = this.formData;
      await editRobotCommonSet({ robotId: id, ...detailInfo });

      const { deviceTypeInfo: deviceList } = this.formData;
      await updateRobotDevice({ robotId: id, deviceList });
      this.$message.success('更新成功')
    },
  },
};
</script>

<style lang="scss" scoped>
.model-dialog {
  .scroll-box {
    padding: 10px;
    .title {
      height: 35px;
      background-color: #f7e5c7;
      line-height: 35px;
      border-radius: 4px;
      border-left: 5px solid #e99a13;
      margin: 20px 0;
      padding-left: 10px;
    }
  }
}
</style>
