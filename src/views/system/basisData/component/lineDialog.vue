<template>
  <el-dialog
    :visible="visible"
    :title="isEdit ? '修改线路' : '新增线路'"
    center
    @close="closeDialog"
  >
    <el-scrollbar style="height: 100%">
      <WForm ref="addForm" :form-data="formData" :columns="lineDialogColumns" />
    </el-scrollbar>
    <div slot="footer" class="btn-grops">
      <el-button icon="el-icon-circle-close" @click="closeDialog">
        取 消
      </el-button>
      <el-button
        type="primary"
        icon="el-icon-circle-check"
        class="button-linear"
        @click="submit"
      >
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import { cloneDeep } from 'lodash-es'
import { WForm } from "@common-ui/w-form";
import {lineDialogColumns} from './config'
import {apiCreatePlace,apiUpdatePlace} from '@/api/interface/index'
export default {
  components: {
    WForm,
  },
  data() {
    return {
      formData: {},
      visible:false,
      lineDialogColumns,
      isEdit:false,
    };
  },
  methods: {
    openDialog(row={},isEdit=false){
      this.visible = true
      this.formData = cloneDeep(row)
      this.isEdit = isEdit
    },

    closeDialog(){
      this.formData = {}
      this.visible=false
    },

    validateForm(){
      return new Promise((resolve)=>{
        this.$refs.addForm.validate((valid)=>{
          resolve(valid) 
        })
      })
    },
    async submit(){
      const valid = await this.validateForm()
      if(valid){
        const api = this.isEdit ? apiUpdatePlace : apiCreatePlace
        api(this.formData).then(()=>{
          this.$message.success(`${this.isEdit?'修改':'新增'}成功！`)
          this.closeDialog()
          this.$emit('refresh')
        })
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.tree-container {
  border: 1px solid #cccccc;
  border-radius: 8px;
}
::v-deep {
  .el-dialog__body {
    padding: 30px px2rem(60);
  }
}
</style>