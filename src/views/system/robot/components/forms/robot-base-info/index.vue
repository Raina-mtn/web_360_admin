<template>
  <div class="robot-base-info">
    <WForm
      ref="Wform"
      label-width="100px"
      :form-data="formData"
      :columns="formColumns"
      :label-position="'top'"
      size="mini"
    />
  </div>
</template>

<script>
import { WForm } from '@common-ui/w-form';
import { getRobotModelList, uploadImg } from '@/api/interface/modules/system/model.js';

export default {
  name: 'RobotBaseInfo',
  components: {
    WForm
  },
  model: {
    prop: 'baseInfo',
    event: 'change',
  },
  props: {
    baseInfo: {
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
      formData: {},
      resolve: null,
      reject: null,
      modelList: [],
      formColumns:[
        {
          label: "头像",
          el: 'wImgUpload',
          span: 24,
          prop: 'profile',
          rules: [
            { required: true, message: '头像不能为空' }
          ],
          required: true,
          max: 1,
          api:uploadImg
        },
        {
          label: '名称',
          prop: 'title',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
          rules: [
            { required: true, message: '名称不能为空' }
          ]
        },
        {
          label: '出厂号',
          prop: 'factoryNumber',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
          rules: [
            { required: true, message: '出厂号不能为空' }
          ]
        },
        {
          label: '功能说明',
          prop: 'func',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
          rules: [
            { required: true, message: '功能说明不能为空' }
          ]
        },
        {
          label: '描述',
          prop: 'desc',
          el: 'input',
          required: true,
          clearable: true,
          span: 11,
          rules: [
            { required: true, message: '描述不能为空' }
          ]
        },
        {
          label: "型号(一旦设置无法修改)",
          prop: "modelId",
          el: 'select',
          options: [],
          placeholder: '请选择型号',
          clearable: true,
          span: 24,
          props: {
            value: 'id',
            label: 'name',
          },
          rules: [
            { required: true, message: '模型不能为空' }
          ]
        }
      ]
    };
  },
  watch: {
    baseInfo: {
      immediate: true,
      handler: function (value) {
        this.formData = value ? value : {};
      },
    },
    ['formData.modelId']: {
      handler: function (value) {
        value && this.modelIdChange(value)
      },
    }
  },
  mounted(){
    getRobotModelList({pageIndex: 1, pageSize: 1000 }).then(res => {
      let { ...item } = this.formColumns[5]
      item.options = res.data.list
      this.$set(this.formColumns, '5', item)
      this.modelIdChange(this.formData.modelId)
    })
  },
  methods: {
    // 提交数据
    async checkForm() {
      return new Promise((resolve, reject) => {
        this.$refs.Wform.validate()
          .then(() => {
            this.$emit('change', this.formData);
            console.log('baseInfo success');
            resolve();
          })
          .catch((error) => {
            console.log('baseInfo error');
            reject();
          });
      });
    },

    // 型号id变了通知设备设备模块更新
    modelIdChange(value) {
      let list = this.formColumns[5].options;
      let item = list.find(item => item.id === value)
      if(item){
        const { componentList } = item;
        this.$EventBus.$emit('modelChange', componentList);
      }
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
