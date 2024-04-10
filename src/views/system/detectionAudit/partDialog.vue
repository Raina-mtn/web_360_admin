<template>
  <el-dialog :visible="visible" :title="'部件编辑'" center @close="closeDialog">
    <el-scrollbar style="height: 100%">
      <WForm ref="addForm" :form-data="formData" :columns="columns" />
    </el-scrollbar>
    <div slot="footer" class="btn-grops">
      <el-button icon="el-icon-circle-close" @click="closeDialog">
        取 消
      </el-button>
      <el-button type="primary" icon="el-icon-circle-check" class="button-linear" @click="submit">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { WForm } from "@common-ui/w-form";
import { apiPartsUpdateName } from '@/api/interface/index'
export default {
  components: {
    WForm,
  },
  data() {
    return {
      originData: {},
      formData: {
        name: ''
      },
      visible: false,
    };
  },
  computed: {
    columns() {
      return [
        {
          label: "部件类型:",
          prop: "name",
          el: "input",
          placeholder: "请输入部件类型",
          rules: [{ required: true, message: "请输入部件类型" }],
          clearable: true,
          span: 24
        },
      ]
    }
  },
  methods: {
    openDialog({ row = {} }) {
      console.log('openDialog>>', row)
      this.originData = row;
      this.formData.name = row.name;
      this.visible = true
    },

    closeDialog() {
      this.visible = false
      this.formData = {
        name: ''
      }
    },
    validateForm() {
      return new Promise((resolve) => {
        this.$refs.addForm.validate((valid) => {
          resolve(valid)
        })
      })
    },
    async submit() {
      const valid = await this.validateForm()
      if (valid) {
        const params = { name: this.formData.name, id: this.originData.id }
        apiPartsUpdateName(params).then(() => {
          this.$message.success('编辑成功！')
          this.$emit('refresh')
          this.closeDialog()
        })
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.item-hd {
  font-size: px2rem(16);
  color: #999;
  padding-left: 1rem;
  position: relative;
  margin-bottom: 2rem;

  &:after {
    position: absolute;
    content: "";
    left: 0;
    top: 50%;
    transform: translate(0%, -50%);
    width: 4px;
    height: 1rem;
    border-radius: 2px;
  }
}

.tree-container {
  border: 1px solid #cccccc;
  border-radius: 8px;
}

::v-deep {

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>