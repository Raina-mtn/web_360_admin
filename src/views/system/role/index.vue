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
        <div slot="btns" class="btns">
          <el-button type="primary" class="btnPrimary" @click="refresh">
            查 询
          </el-button>
          <el-button type="primary" class="btnPrimary" @click="reset">
            重 置
          </el-button>
        </div>
      </WForm>
      <div class="btn-bar">
        <el-button icon="el-icon-plus" type="primary" size="mini" @click="openDialog({})">
          新 增
        </el-button>
      </div>
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
    <RoleDialog ref="dialog" v-model="showDialog" :is-edit="isEdit" @submit="refresh" />
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/page-layout/index.vue'
import {listMixin} from "@/mixin/list"
import {WForm, WTable} from '@common-ui/w-form'
import RoleDialog from './roleDialog.vue'
import {formColumns,columns} from './config'
import {apiGetRoleList, apiDelRole} from '@/api/interface/index'
export default {
  components: {
    RoleDialog,
    WForm,
    WTable,
    PageLayout
  },
  mixins:[listMixin],
  data() {
    return {
      formData: {
        pageIndex: 1,
        pageSize: 10
      },
      formColumns,
      columns:columns(this) ,
      tableData:[],
      total:0,
      showDialog: false,
      isEdit: false,
      deleteAPi: apiDelRole
    }
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList(){
      this.showDialog = false
      apiGetRoleList(this.formData).then((res) => {
        this.tableData = res.data.list
        this.total = parseInt(res.data.totalCount)
      })
    },
    refresh(){
      this.formData.pageIndex = 1
      this.formData.pageSize = 10
      this.getList()
    },
    openDialog(row={},isEdit=false){
      this.showDialog = true
      this.isEdit = isEdit
      this.$refs.dialog.show(row, isEdit)
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