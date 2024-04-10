<template>
  <el-dialog
    :visible="visible"
    title="过检列车列表"
    @close="visible=false"
  >
    <el-scrollbar style="height: 100%">
      <WTable
        ref="mtable"
        :table-data="tableData" 
        :stripe="true"
        :border="false"
        :columns="vehicleColumns"
        :size="'mini'"
        :page="formData"
        :total="total"
        :header-cell-style="{ background: '#002C75' }"
        :row-class-name="
          ({ row, rowIndex }) => (rowIndex % 2 == 0 ? '' : 'warning-row')
        "
        @pageChange="getList"
      />
    </el-scrollbar>
  </el-dialog>
</template>
<script>
import { WTable } from "@common-ui/w-form";
import {vehicleColumns} from './config'
import {getHometVehicleList} from '@/api/interface/index'
export default {
  components: {
    WTable,
  },
  data() {
    return {
      tableData: [],
      formData:{
        pageIndex:1,
        pageSize:10,
        beginTime:null,
        endTime:null,
      },
      total:0,
      visible:false,
      vehicleColumns,
    };
  },
  methods: {
    async openDialog(params){
      this.formData.beginTime = params.beginTime
      this.formData.endTime = params.endTime
      await this.getList()
      this.visible = true
    },
    getList(){
      getHometVehicleList(this.formData).then(res=>{
        this.tableData = res.data.list
        this.total = Number(res.data.totalCount)
      })
    }
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
  .el-dialog__body {
    padding: 30px px2rem(60);
  }
}
</style>
<style lang="scss" scoped>
::v-deep{
  .el-dialog{
    
  height: 550px;
    .el-dialog__body{
      height: 95%;
    }
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>