<template>
  <PageLayout>
    <div class="common-container">
      <div class="content">
        <div class="content-main">
          <div class="main-item">
            <label>系统名称：</label><el-input v-model="formData.title" />
          </div>
          <div class="main-item">
            <label>系统版本号：</label><el-input disabled :value="formData.softwareVersion" />
          </div>
          <div class="main-item">
            <label>公司logo：</label>
            <div class="logo-wrapper">
              <div class="logo-item">
                <div class="control-text">
                  <span>登录页logo</span>
                  <el-upload
                    ref="loginLogo"
                    class="upload-demo"
                    :limit="1"
                    :on-success="(res)=>handleSuccess(res, 'loginLogo')"
                    :on-error="uploadError"
                    v-bind="uploadSetting"
                  >
                    <el-button type="text" icon="el-icon-picture-outline">
                      重新上传
                    </el-button>
                  </el-upload>
                </div>
                <div class="image-wrapper">
                  <el-image :src="formData.loginLogo" />
                </div>
              </div>
              <div class="logo-item">
                <div class="control-text">
                  <span>首页logo</span>
                  <el-upload
                    ref="homepageLogo"
                    class="upload-demo"
                    :limit="1"
                    :on-success="(res)=>handleSuccess(res, 'homepageLogo')"
                    :on-error="uploadError"
                    v-bind="uploadSetting"
                  >
                    <el-button type="text" icon="el-icon-picture-outline">
                      重新上传
                    </el-button>
                  </el-upload>
                </div>
                <div class="image-wrapper">
                  <el-image :src="formData.homepageLogo" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-grops">
          <el-button type="primary" class="button-linear" @click="submit">
            保存配置
          </el-button>
          <el-button type="primary" class="button-linear" @click="reset">
            重 置
          </el-button>
        </div>
      </div>
    </div>
  </PageLayout>
</template>
<script>
import PageLayout from '@/components/page-layout/index.vue'
import {mapGetters} from 'vuex'
import { apiUpdateSysSetting} from '@/api/interface/index.js'
import {themeSetting} from '@/utils/config.js'
const { NODE_ENV, VUE_APP_DOMAIN_BASE } = process.env

export default {
  components: {
    PageLayout
  },
  data() {
    return {
      formData:{
        homepageLogo:require('@/assets/images/logo.png'),
        loginLogo:require('@/assets/images/loginbg.png'),
        title: '车辆360°动态图像智能检测系统',
        softwareVersion:'V 2.0.0'
      },
      uploadSetting:{
        name:"imgFile",
        // 请求头
        headers: {
          token: this.$store?.state?.user?.token
        },
        accept: ".jpg, .png, .jpeg, .gif",
        action:NODE_ENV !== 'prod' ? VUE_APP_DOMAIN_BASE + '/upload/image' : `http://${window.location.host}/upload/image`,
        showFileList: false
      },
      systemStyle:themeSetting,
    }
  },
  computed:{
    ...mapGetters('system', ['themeColor', 'themePattern'])
  },
  watch: {
    themeColor(){
      this.changeTheme() // changeTheme方法在mixin里
    }
  },
  mounted(){
    this.formData = {
      ...this.formData,
      ...this.$store.state.system.setting
    }
  },
  methods:{
    submit(){
      console.log(this.formData);
      const params = {
        ...this.formData,
        pattern: this.themePattern
      }
      apiUpdateSysSetting(params).then(()=>{
        this.$message.success('保存成功')
        this.$store.commit('system/SET_SETTING', params)
      })
    },
    handleSuccess(res, str) {
      const { code, data, msg } = res;
      if (code === 1 && data) {
        this.$set(this.formData, str, this.$store.state.system.setting.imgPath + data)
        console.log('this.$store.state.system.setting.imgPath + data :>> ', this.$store.state.system.setting.imgPath + data);
        this.$refs[str].clearFiles()
      } else {
        return this.$message.error(msg);
      }
    },   
    // 上传失败
    uploadError() {
      this.$message.error("文件上传失败");
    },
    reset(){
      this.formData = {
        homepageLogo:require('@/assets/images/logo.png'),
        loginLogo:require('@/assets/images/loginbg.png'),
        title: '车辆360°动态图像智能检测系统',
        softwareVersion:'V 2.0.0'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.content{
  padding: 20px;
  border-radius: 8px;
  height: 100%;
  .content-main{
    width: 55rem;
    margin:20px;
    .main-item{
      margin-bottom:2rem ;
      label{
        font-size: 1rem;
        color: #fff;
      }
      .el-input{
        width: 50%;
      }
    }
    .logo-wrapper{
      display: flex;
      margin-top: 2rem;
      justify-content: space-between;
      .logo-item{
        // flex: 1;
        margin: 20px;
        .image-wrapper{
          width: 100%;
          height: 100%;
          background-size: 100% 100%;
          // background-repeat: no-repeat;
          // background-size: auto;
          background: #ccc;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        .control-text{
          display: flex;
          width: 25rem;
          justify-content: space-between;
          font-size: 1rem;
          font-weight: 500;
          align-items: center;
          font-family: "微软雅黑";
          color: #fff;
        }
      }
    }
    .color-wrapper{
      display: flex;
      justify-content: space-between;
      text-align: center;
      font-size: 18px;
      margin-top: 20px;
      .color-item{
        width: 50px;
        height: 50px;
        border: 3px solid transparent;
        margin-bottom: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-icon-check{
          font-size: 2rem;
          font-weight: bold;
          color: #fff;
        }
      }
    }
  }
  .btn-grops{
    width: 58%;
    text-align: center;
    .el-button{
      width: px2rem(200);
      height: px2rem(44);
    }
  }
}
</style>