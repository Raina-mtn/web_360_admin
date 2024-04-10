<!--
 * @Date: 2022-04-24 13:08:49
 * @LastEditors: 朱思生 zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2022-06-06 16:44:37
 * @FilePath: /explosive-robot/src/views/systemManage/user/userDialog.vue
-->
<template>
  <el-dialog :visible="visible" :title="isEdit ? '修改账号' : '新增账号'" @close="$emit('on-change', false)">
    <el-scrollbar style="height: 100%">
      <WForm ref="roleForm" :form-data="formData" :columns="formColumns" label-width="100px" />
    </el-scrollbar>
    <div slot="footer" class="btn-grops">
      <el-button icon="el-icon-circle-close" @click="$emit('on-change', false)">
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
import {WForm} from '@common-ui/w-form'
import {formColumnsDialog} from './config'
import { apiCreateUser, apiUpdateUser } from '@/api/interface/index.js'
export default {
  components: {
    WForm
  },
  model: {
    prop: 'visible',
    event: 'on-change'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    orgData:{
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      formData: {},
      isEdit:false,
    }
  },
  computed:{
    formColumns(){
      return formColumnsDialog(this.orgData,this.isEdit)
    }
  },
  methods: {
    submit() {
      const api = this.isEdit ? apiUpdateUser : apiCreateUser
      this.$refs.roleForm.validate((valid) => {
        if (valid) {
          const params = {
            orgId:0,
            ...this.formData,
            userName:this.formData.realName,
            roleIdList: [this.formData.roleId]
          }
          api(params).then(() => {
            this.$message.success('提交成功')
            this.$emit('submit', false)
          })
        }
      })
    },
    show({ password, roleList, ...other }, isEdit) {
      this.isEdit = isEdit
      const params = {
        password: this.isEdit ? '': password,
        roleId: roleList && roleList.length ? roleList[0].id : '',
        ...other
      }
      this.formData = cloneDeep(params)
    },
  }
}
</script>
<style lang="scss" scoped>
::v-deep{
    .el-dialog__body{
      padding: 30px px2rem(60);
    }
}
</style>