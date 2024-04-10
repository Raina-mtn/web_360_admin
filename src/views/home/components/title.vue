<template>
  <div class="title-box">
    <img class="title-bg-1" src="@/assets/images/bg_title.png" alt="">
    <img class="title-bg-2" :src="titleBg" alt="">
    <span class="title-text">{{ titleName }}</span>
  </div>
</template>

<script>
export default {
  props:{
    titleName:{
      type:String,
      default:''
    },
    titleBg:{
      type:String,
      default:''
    },
  }
}
</script>

<style lang="scss" scoped>
.title-box{
  width: 243px;
  height: 38px;
  position: relative;
  .title-text {
    line-height: 38px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    margin-left: 50px;
    z-index: 2;
    position: relative;
  }
  .title-bg-2{
    position: absolute;
    top: 0;
    left: 11px;
  }
  .title-bg-1 {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0
  }
  span{
    color: #E99A13;
    font-size: 18px;
    font-weight: bold;
  }
}
</style>