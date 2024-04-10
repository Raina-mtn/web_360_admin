<template>
  <el-upload
    class="upload-demo"
    :action="`${NODE_ENV !== 'prod' ? VUE_APP_DOMAIN_BASE : `http://${window.location.host}`}${action}`"
    :accept="accept"
    :name="name"
    :limit="limit"
    :show-file-list="showFileList"
    :file-list="fileList"
    :on-exceed="handleExceed"
    :on-success="handleSuccess"
    :on-error="uploadError"
    :headers="headers"
  >
    <el-button id="import-btn" type="primary" size="mini" class="btnPrimary" icon="el-icon-download">
      导 入
    </el-button>
  </el-upload>
</template>
<script>
const { NODE_ENV, VUE_APP_DOMAIN_BASE} = process.env
export default {
  props:{
    action:{
      type:String,
      default:''
    },
    accept: {
      type: String,
      default: ".xlsx,.xls",
    },
    name: {
      type: String,
      default: "file",
    },
    limit: {
      type: Number,
      default: 9,
    },
    // 请求头
    headers: {
      type: Object,
      default() {
        return {
          token: this.$store?.state?.user?.token
        };
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showFileList: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fileList:[],
      NODE_ENV,
      VUE_APP_DOMAIN_BASE,
      window,
    }
  },
  methods:{
    handleSuccess(res, file, fileList) {
      const { code, data, msg } = res;
      if (code === 1 && data) {
        this.fileList.push({name:file.name,url:data});
        this.$emit('getList')
        this.$message.success("导入成功");
      } else {        
        return this.$message.error(msg);
      }
    },
    // 上传失败
    uploadError() {
      this.$message.error("文件上传失败");
    },
    handleExceed() {
      this.$message.error("请勿上传多个文件！");
    },
  }
}
</script>
<style lang="scss" scoped>
.upload-demo{
  display: inline-block;
  .btnPrimary{
    margin:0 10px;
  }
}
</style>