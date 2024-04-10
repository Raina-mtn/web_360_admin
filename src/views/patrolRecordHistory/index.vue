<template>
  <PageLayout>
    <div class="content">
      <WForm
        label-width="90px"
        :form-data="formData"
        :columns="formColumns"
        size="mini"
        @inputEnter="refresh"
      >
        <div slot="btns">
          <el-button type="primary" class="btnPrimary" @click="refresh">
            查 询
          </el-button>
          <el-button type="primary" class="btnPrimary" @click="reset">
            重 置
          </el-button>
          <el-button type="primary" class="btnPrimary" @click="exportFile">
            导 出
          </el-button>
        </div>
      </WForm>
      <WTable
        ref="mtable"
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
  </PageLayout>
</template>
<script>
import dayjs from 'dayjs'
import PageLayout from '@/components/page-layout/index.vue'
import {listMixin} from "@/mixin/list"
import {WForm, WTable} from '@common-ui/w-form'
import {formColumns,columns,days} from './config'
import {apiGetDefectList,apiExportList} from "@/api/interface/index";
export default {
  components: {
    WForm,
    WTable,
    PageLayout
  },
  mixins:[listMixin],
  data() {
    return {
      formData: {
        plateNumber: '',
        pageIndex: 1,
        pageSize: 10,
        fault:false,
        'minBeginTime,maxBeginTime':[]
      },
      radio:1,
      formColumns,
      columns:columns(this) ,
      tableData:[],
      total:0,
      days,
    }
  },
  mounted() {

    const { plateNumber } = this.$route.query
    if(plateNumber){
      console.log('plateNumber>>', plateNumber)
      this.formData['plateNumber'] = plateNumber;
    }

    this.getList()
  },
  methods:{
    getList(){
      apiGetDefectList(this.formData).then((res) => {
        this.tableData = res.data.list
        this.total = parseInt(res.data.totalCount)
      })
    },
    refresh(){
      this.formData.pageIndex = 1
      this.formData.pageSize = 10
      this.getList()
    },

    radioChange(val){
      this.formData.minLastPatrolTime = dayjs().subtract(val, 'day').format('YYYY-MM-DD HH:mm:ss')
      this.getList()
    },

    exportFile(){
      if(!this.$refs.mtable.$children[0].selection.length){
        this.$message.error('请至少选择一条记录！')
      }else{
        this.$prompt('请输入导出文件名！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          inputValidator:(value)=>value?true:'请输入导出文件名！'
        }).then(({value})=>{
          const params={
            idList:this.$refs.mtable.$children[0].selection.map(i=>i.id)
          }
          const url = '/defect/export'
          const token = this.$store?.state?.user?.token
          apiExportList({url, params, name:value, token})
        })
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.content{
  .btn{
    i{
      color: #1CDAFC;
      font-size: 20px;
    }
  }
  .table{
    height: calc(100% - 8rem);
    ::v-deep{
      max-height: calc(100% - 6rem);
    }
  }
  .btn-bar{
    margin: 10px;
  }
}
</style>