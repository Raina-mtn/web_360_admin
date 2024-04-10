<template>
  <el-dialog
    :visible="visible"
    :title="isEdit ? '修改车辆' : '新增车辆'"
    @close="closeDialog"
  >
    <el-scrollbar style="height: 100%">
      <WForm
        ref="addForm"
        :form-data="formData"
        :columns="vehicleDialog" 
        @currentObj="getCurrentObj"
      />
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
import {vehicleDialogColumns} from './config'
import {apiCreateVehicle,apiUpdateVehicle,apiGetPlaceList,apiDeleteVehicle} from '@/api/interface/index'
export default {
  components: {
    WForm,
  },
  data() {
    return {
      formData: {},
      visible:false,
      areaList:[],
      isEdit:false,
    };
  },
  computed:{
    vehicleDialog(){
      return vehicleDialogColumns(this.areaList)
    }
  },
  methods: {
    openDialog(row={},isEdit=false){
      console.log(row)
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
        const api = this.isEdit ? apiUpdateVehicle : apiCreateVehicle
        api(this.formData).then(()=>{
          this.$message.success(`${this.isEdit?'修改':'新增'}成功！`)
          this.closeDialog()
          this.$emit('refresh')
        })
      }
    },
    delList(id){
      this.$confirm('确认删除该条记录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        apiDeleteVehicle({id:id}).then(()=>{
          this.$message.success('删除成功！')
          this.$emit('refresh')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    getCurrentObj(obj, key){
      if(key === 'lineId'){
        const params = {
          lineId:obj.id,
          pageIndex: 1,
          pageSize: 1000
        }
        apiGetPlaceList(params).then(res=>this.areaList = res.data.list.map(v=>({
          label:v.chName,
          value:v.id
        })))
      }
      if(key === 'modelId'){
        this.$set(this.formData,'carriageNumber',obj.carriageNumber)
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
</style>