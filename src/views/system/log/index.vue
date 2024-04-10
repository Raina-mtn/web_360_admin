<template>
  <PageLayout>
    <div class="common-container">
      <div class="content">
        <WForm 
          label-width="100px" 
          :form-data="formData" 
          :columns="formColumns" 
          size="mini"
          @inputEnter="refresh"
        >
          <div slot="btns" class="btns">
            <el-button size="small" type="primary" class="button-linear" @click="refresh">
              查 询
            </el-button>
            <el-button size="small" type="primary" @click="reset">
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
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/page-layout/index.vue'
import {WForm, WTable} from '@common-ui/w-form'
import {formColumns,columns} from './config'
import {apiGetLog} from '@/api/interface/index'
import {listMixin} from "@/mixin/list"
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
        pageIndex: 1,
        pageSize: 10,
        'minVisitTime,maxVisitTime':[]
      },
      formColumns,
      columns ,
      tableData:[],
      total:0
    }
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList(){
      apiGetLog(this.formData).then((res) => {
        this.tableData = res.data.list
        this.total = parseInt(res.data.totalCount)
      })
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