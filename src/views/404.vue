<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" src="@/assets/images/404.png" alt="404">
      </div>
      <div class="bullshit">
        <div href="" class="bullshit__return-home" @click="goback">
          返回首页
        </div>
        <div class="bullshit__oops">
          您没有该页面权限，请联系管理员修改
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    async goback() {
      this.$router.replace('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.wscn-http404-container{
  transform: translate(-50%,-50%);
  position: absolute;
  top: 40%;
  left: 50%;
}
.wscn-http404 {
  position: relative;
  width: 1200px;
  padding: 0 50px;
  overflow: hidden;
  text-align: center;
  .pic-404 {
    position: relative;
    width: 400px;
    overflow: hidden;
    margin: 10px auto;
    &__parent {
      width: 100%;
    }
  }
  .bullshit {
    display: inline-block;
    position: relative;
    padding: 30px 0;
    overflow: hidden;
    margin: 10px auto;
    &__oops {
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
      color: #8897AA;
    }
    &__return-home {
      display: block;
      margin: 0 auto;
      width: 110px;
      height: 36px;
      background: #e89a12;
      border-radius: 100px;
      text-align: center;
      color: #ffffff;
      font-size: 14px;
      line-height: 36px;
      cursor: pointer;
      &:hover{
        background: #fda917;
      }
    }
  }
}
</style>
