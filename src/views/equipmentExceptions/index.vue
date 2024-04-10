<template>
  <PageLayout>
    <div class="common-container">
      <div class="content">
        <WForm label-width="100px" :form-data="formData" :columns="formColumns" size="mini">
          <div slot="userNameLike">
            <el-select v-model="formData.moduleId" clearable placeholder="请选择设备名称">
              <el-option
                v-for="(item,index) in userNameList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div slot="btns" class="btns">
            <el-button size="small" type="primary" icon="el-icon-search" class="button-linear" @click="refresh">
              查 询
            </el-button>
            <el-button size="small" type="primary" icon="el-icon-refresh" @click="reset">
              重 置
            </el-button>
          </div>
        </WForm>
        <WTable
          ref="mtable"
          show-num
          :table-data="tableData" 
          :stripe="true"
          :border="false"
          :columns="columns"
          selection
          :selectable="() => true"
          :page="formData"
          :total="total"
          :size="'mini'"
          :header-cell-style="{ background: '#002C75' }"
          :row-class-name="
            ({ row, rowIndex }) => (rowIndex % 2 == 0 ? '' : 'warning-row')
          "
          @pageChange="getList"
        />
      </div>
    </div>
    <HistoryDialog ref="historyDialog" v-model="showDialog" @submit="getList" />
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/page-layout/index.vue'
import {WForm, WTable} from '@common-ui/w-form'
import {formColumns,columns} from './config'
import {getEquipmentList,getDeviceList} from '@/api/interface/index'
import HistoryDialog from './historyDialog.vue';
export default {
  components: {
    WForm,
    WTable,
    PageLayout,
    HistoryDialog
  },
  data() {
    return {
      formData: {
        pageIndex: 1,
        pageSize: 10,
        'minReportTime,maxReportTime':[]
      },
      formColumns,
      columns:columns(this),
      tableData:[],
      total:0,
      showDialog: false,  
      userNameList:[],
    }
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList(){
      getEquipmentList(this.formData).then((res) => {
        this.tableData = res.data.data
        this.total = parseInt(res.data.totalCount)
      })
      getDeviceList({}).then(res =>{
        this.userNameList = res.data.map(item=>({value:item.id,label:item.name}))
      })
    },
    refresh(){
      this.formData.pageIndex = 1
      this.formData.pageSize = 10
      this.getList()
    },
    openDialog(row){
      this.showDialog = true
      this.$refs.historyDialog.show(row)
    },
    reset(){
      this.formData = {
        pageIndex: 1,
        pageSize: 10,
        'minReportTime,maxReportTime':[],
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.common-container{
  .content{
    padding: px2rem(20);
    border-radius: 8px;
    height: 100%;
  }
  .table{
    height: calc(100% - 8rem);
    ::v-deep{
      max-height: calc(100% - 6rem);
    }
  }
}
.btn-bar{
  margin: 10px;
}
</style>