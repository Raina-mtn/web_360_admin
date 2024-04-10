<template>
  <div class="page-header">
    <div v-if="showBack" class="page-header__left" @click="$emit('back')">
      <i class="el-icon-back" />
      <div class="page-header__title">
        返回
      </div>
    </div>
    <div class="page-header__content">
      {{ content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    showBack:{
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default:''
    }
  }
};
</script>
<style lang="scss" scoped>
.page-header {
    display: flex;
    line-height: 24px;
    padding: 15px;
    border-bottom: 1px solid #eee;
}

.page-header__left {
    display: flex;
    cursor: pointer;
    margin-right: 40px;
    position: relative
}

.page-header__left::after {
    content: "";
    position: absolute;
    width: 1px;
    height: 16px;
    right: -20px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    background-color: #DCDFE6
}

.page-header__left .el-icon-back {
    font-size: 18px;
    margin-right: 6px;
    -ms-flex-item-align: center;
    align-self: center
}

.page-header__title {
    font-size: 14px;
    font-weight: 500
}

.page-header__content {
    font-size: 18px;
   
}
</style>
