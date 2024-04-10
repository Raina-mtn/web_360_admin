<template>
  <PageLayout>
    <div class="content-right">
      <WForm 
        label-width="80px" 
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
        show-num
        :table-data="tableData" 
        :stripe="true"
        :border="false"
        :columns="columns"
        selection
        :selectable="() => true"
        :page="formData"
        :size="'mini'"
        :total="total"
        :header-cell-style="{ background: '#002C75' }"
        :row-class-name="
          ({ row, rowIndex }) => (rowIndex % 2 == 0 ? '' : 'warning-row')
        "
        @pageChange="getList"
      />
    </div>
    <UserDialog ref="dialog" v-model="showDialog" :org-data="orgData" @submit="getList" />
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/page-layout/index.vue'
import {listMixin} from "@/mixin/list"
import {WForm, WTable} from '@common-ui/w-form'
import UserDialog from './userDialog.vue'
import {formColumns,columns} from './config'
import {userStatus} from '@/utils/config'
import {apiGetUserList, apiDelUser, apiUpdateUserStatus,apiResetPass} from '@/api/interface/index'
export default {
  components: {
    UserDialog,
    WForm,
    WTable,
    PageLayout
  },
  mixins:[listMixin],
  data() {
    return {
      formColumns,
      columns:columns(this) ,
      tableData:[],
      total:0,
      showDialog: false,
      orgData:[],
      rootOrgId: '',
      deleteAPi: apiDelUser,
      userInfo:this.$store.state.user.userInfo,
      formData:{}
    }
  },
  mounted(){
    this.getList()
  },
  methods:{
    getList(){
      this.showDialog = false
      const params = {
        ...this.formData,
        rootOrgId: this.rootOrgId
      }
      apiGetUserList(params).then((res) => {
        this.tableData = res.data.list
        this.total = parseInt(res.data.totalCount)
      })
    },
    refresh(){
      this.formData.pageIndex = 1
      this.formData.pageSize = 10
      this.getList()
    },
    // 点击组织架构查询用户
    onClickNode(node){
      this.rootOrgId = node.id
      this.getList()
    },
    openDialog(row, isEdit){
      this.showDialog = true
      this.$refs.dialog.show(row, isEdit)
    },
    // 重置密码
    resetPass(row){
      this.$confirm('确认重置密码吗？', '提示', {
        type: 'warning'
      }).then(() => {
        apiResetPass({
          userId: row.id
        }).then(res => {
          this.$message.success('重置成功')
        })
      })
    },
    // 禁用
    handleForbidden(row){
      let obj = {id: row.id}
      if(row.status === userStatus[0].value){
        obj.status=userStatus[1].value,
        obj.msg='禁用'
      }else{
        obj.status=userStatus[0].value,
        obj.msg='启用'
      }
      this.$confirm(`确认${obj.msg }该用户？`, '提示', {
        type: 'warning'
      }).then(() => {
        apiUpdateUserStatus({
          ...obj
        }).then(() => {
          this.$message.success(`已${obj.msg}`)
        }).finally(() => {
          this.getList()
        })
      })
    }
  }
}
</script>
<style lang="scss">
.btn-bar{
  margin: 10px;
}
</style>