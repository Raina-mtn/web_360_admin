<!--
 * @Date: 2022-07-07 15:31:46
 * @LastEditors: zhusisheng zhusisheng@shenhaoinfo.com
 * @LastEditTime: 2022-07-12 13:37:51
 * @FilePath: \web-rail-independ\src\components\Layout\langsetDialog.vue
-->
<template>
  <div>
    <el-dropdown-item divided @click.native="dialogVisible = true">
      <span style="display:block;">{{ $t('navbar.langBtn') }}</span>
    </el-dropdown-item>
    <el-dialog
      width="300px"
      title="提示"
      :visible.sync="dialogVisible"
      :append-to-body="true"
    >
      <el-radio v-model="lang" label="zhSimplifiexd">
        简体
      </el-radio>
      <el-radio v-model="lang" label="zhTraditional">
        繁體
      </el-radio>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      lang: ''
    };
  },
  created(){
    this.lang = this.$store.state.user.lang
  },
  methods: {
    confirm(){
      this.$i18n.locale = this.lang
      this.$store.dispatch("user/setLang", this.lang)
      this.dialogVisible = false
    }
  }
};
</script>