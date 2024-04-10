<template>
  <el-dialog
    :visible="visible"
    :title="isBatch?'批量修改'
      :isEdit ? '修改风险等级' : '新增风险等级'"
    center
    @close="closeDialog"
  >
    <el-scrollbar style="height: 100%">
      <WForm ref="addForm" :form-data="formData" :columns="columns" />
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
import {levelDialogColumns} from './config'
import {apiCreateRisk,apiUpdateRisk,apiUpdateBatch, listByPartId} from '@/api/interface/index'
export default {
  components: {
    WForm,
  },
  data() {
    return {
      formData: {
        partsId: undefined,
        itemId: ''
      },
      visible:false,
      isEdit:false,
      isBatch:false,
      levelDialogColumns
    };
  },
  computed:{
    columns(){
      return this.levelDialogColumns
    }
  },
  watch: {
    ['formData.partsId'](newVal, oldVal){
      if (newVal) {
        listByPartId({partsId: newVal}).then(res => {
          this.columns[1].options = res.data.map(item => ({ value: item.id,label: item.name }));
          let hasItem = res.data.some(item => item.id == this.formData.itemId)
          if(!hasItem){
            this.$set(this.formData, 'itemId', '')
          }
        })
      } else {
        this.columns[1].options = [];
      }
    }
  },
  methods: {
    openDialog({row={},isEdit=false,isBatch=false}){
      this.formData = cloneDeep(row)
      this.visible = true
      this.isEdit = isEdit
      this.isBatch = isBatch
      this.levelDialogColumns[1].rules[0].required = !isBatch
    },

    closeDialog(){
      this.visible=false
      this.formData = {}
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
        const api = this.isBatch
          ?apiUpdateBatch
          :this.isEdit ? apiUpdateRisk : apiCreateRisk
        api(this.formData).then(()=>{
          this.$message.success(`${this.isBatch?'批量修改':this.isEdit?'修改':'新增'}成功！`)
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