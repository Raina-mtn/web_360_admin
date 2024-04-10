<template>
  <div class="login-container">
    <div class="logo">
      <img :src="$store.state.system.setting.loginLogo">
    </div>
    <div class="bg" />
    <div class="login-form">
      <p class="login-title">
        {{ $store.state.system.setting.title || "车辆360°动态图像智能检测系统" }}
      </p>
      <el-form
        ref="loginForm"
        :model="loginForm"
        label-width="100px"
        :rules="loginRules"
        label-position="top"
      >
        <el-form-item :label="'用户名'" prop="username">
          <el-input
            v-model="loginForm.username"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <el-form-item :label="'密码'" prop="pass">
          <el-input
            v-model="loginForm.pass"
            type="password"
            @keyup.enter.native="handleLogin"
          />
        </el-form-item>
        <div class="btn-tool">
          <el-button type="primary" class="btn-login" @click="handleLogin">
            登录
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import {validatePassword,validateUser} from '@/utils/validate'
export default {
  data() {
    return {
      loginForm: {
        username: "",
        pass: "",
      },
      loginRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { validator: validateUser, trigger: 'blur' }
        ],
        pass: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { validator: validatePassword, trigger: 'blur' }],
      },
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  mounted(){
    this.$store.dispatch('system/getSysSetting')
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store.dispatch("user/login", this.loginForm).then(() => {
            console.log("登录成功");
            this.$router.push({ path: this.redirect || "/" });
          });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.loginForm = { username: "", pass: "" };
    },
    forgetPass() {},
  },
};
</script>
<style scoped lang="scss">
.login-container {
  // background: url("~@/assets/images/loginbg.png");
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  background-color: #06185d;
  display: flex;
  justify-content: center;
  align-items: center;
    .logo{
      position: absolute;
      width: 200px;
      height: 45px;
      left: 10px;
      top: 10px;
      img{
        height: 100%;
        width: 100%;
      }
    }
  @media screen and (min-width: 1280px) {
    .bg {
      width: 100%;
      height: 100%;
      background: url("~@/assets/images/loginbg.png");
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
    .login-form{
      position: absolute;
      right: 22%;
      top: 30%;
    }
  // .logo{
  //     float: left;
  //     padding-top: px2rem(55);
  //     padding-left: px2rem(114);
  //       height: 5rem;
  //       width: auto;
  //     img{
  //       display: block;
  //       margin-right: 2rem    ;
  //     }
  //   }
  }

  @media screen and (max-width: 1280px) {
    .bg {
      display: none;
    }
    .login-form{
      position: unset;
    }
  }
}
.login-form {
  width: 466px;
  z-index: 20;
  border-radius: 10px;
  & > form {
    padding: 25px 50px;
  }

  .login-title {
      color: #1CDAFC;
      font-size: 28px;
      font-weight: bold;
      width: 100%;
      text-align: center;
      margin-bottom: 50px;
      line-height: 28px;
  }
  .btn-tool {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .btn-login{
      width: 100%;
      color: #fff
    }
  }
  
}
::v-deep {
  .el-form {
    background: url("~@/assets/images/bg_login.png");
    background-size: cover;
    height: 328px;
    width: 466px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .el-form-item__label {
    padding: 0;
  }
}
</style>
