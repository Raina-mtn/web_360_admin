<template>
  <div class="component-dialog">
    <el-dialog
      title="组件编辑"
      :before-close="closeDialog"
      :visible.sync="isShow"
      :modal-append-to-body="true"
      append-to-body
      center
    >
      <el-scrollbar>
        <div class="dialogFormBox">
          <WForm
            ref="indicatorForm"
            label-width="100px"
            :form-data="formData"
            :columns="formColumns"
            :label-position="'top'"
            size="mini"
          >
            <ComponentList slot="componentList" v-model="formData.componentList" />
            <WSelect
              slot="deviceType"
              v-model="formData.deviceType"
              init-http
              :get-list="getRobotDeiveType"
              :value-key="valueKey"
              :filterable="false"
            />
            <template #btns>
              <el-button type="primary" style="float: right" @click="submit">
                保存
              </el-button>
            </template>
          </WForm>
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import { WForm, WSelect } from '@common-ui/w-form';
import { getRobotDeiveType } from '@/api/interface/modules/system/model';

export default {
  name: 'ComponentDialog',
  components: {
    WForm,
    WSelect,
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
      formData: {},
      resolve: null,
      reject: null,
      getRobotDeiveType,
      valueKey: {
        label: 'name',
        value: 'type',
      },
    };
  },
  computed: {
    formColumns() {
      return [
        {
          label: '组件类型编码',
          prop: 'type',
          el: 'input',
          required: true,
          clearable: true,
          span: 24,
        },
        {
          label: '组件类型名称',
          prop: 'name',
          el: 'input',
          required: true,
          clearable: true,
          span: 24,
        },
        {
          label: '设备类型',
          prop: 'deviceType',
          required: true,
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
      return new Promise((resolve, reject) => {
        this.formStatus = type;
        let editParams = {};
        if (type === 'edit') {
          this.formColumns.map((v) => {
            editParams[v.prop] = dialogData[v.prop];
          });
        }
        this.formData = {
          ...editParams,
        };

        this.formOriginData = { ...dialogData };
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
      this.formData.formItems = [];
    },
    // 提交数据
    submit() {
      this.$refs.indicatorForm
        .validate()
        .then(() => {
          console.log('表单检验成功');
          const params = {
            ...this.formData,
          };

          this.resolve(params)
          this.closeDialog();
          this.resetDialog()
        })
        .catch((err) => {
          console.log('表单检验失败', err);
          this.$message.error('请检查表单');
        });
    },
  },
};
</script>

<style lang="scss"  scoped>
.btnBox {
  margin-top: 20px;
}

// 清除滚动条
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
</style>

<style lang="scss" scoped>
.dialogFormBox {
  padding: 0 20px;
  form {
    justify-content: space-between;
    ::v-deep {
      .el-input-number {
        width: 100%;
      }
    }
  }
}
.indicator-dialog-cascader-popper {
  .in-active-path {
    color: #606266;
    font-weight: 400;
  }
  .is-active {
    color: #606266;
    font-weight: 400;
  }
}
</style>
