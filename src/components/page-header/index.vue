<template>
  <div class="common-container">
    <el-page-header :content="content" class="header" @back="goBack" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageHeader',
  props:{
    content: {
      type: String,
      default:''
    }
  },
  methods: {
    goBack(){
      this.$router.back()
    },
  }
}
</script>
<style lang="scss" scoped>
.header{
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 1rem;
}
.content{
    background: #fff;
    padding: 1.6rem;
    border-radius: 8px;
    height: calc(100% - 8rem);
}
</style>