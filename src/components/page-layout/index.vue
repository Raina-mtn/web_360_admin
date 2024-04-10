<!--
 * @Date: 2022-06-20 10:30:04
 * @LastEditors: DESKTOP-58041OI\zzs squanchy@yeah.net
 * @LastEditTime: 2022-08-16 15:44:37
 * @FilePath: \web_360_admin\src\components\page-layout\index.vue
-->
<template>
  <div class="pageLayout-container">
    <div>
      <div class="title-area">
        <div class="title-box">
          <img class="title-bg-1" src="@/assets/images/bg_title.png" alt="">
          <img class="title-bg-2" src="@/assets/images/ic_list.png" alt="">
          <span class="title-text">{{ title ?? $route.meta.title }}</span>
        </div>
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLayout',
  props: {
    title: {
      type: String,
      default: undefined
    }
  },
}
</script>

<style scoped lang="scss">
.pageLayout-container {
  height: calc(100% - 50px);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;

  &>div {
    padding: 0 20px 10px 20px;
    height: 100%;
  }

  .title-area {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 14px;
    // margin-bottom: 20px;
    margin-bottom: 0;
    box-sizing: border-box;

    .title-box {
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

      .title-bg-2 {
        position: absolute;
        top: 0;
        left: 11px;
      }

      .title-bg-1 {
        position: absolute;
        bottom: 0;
        left: 0
      }

      span {
        color: #E99A13;
        font-size: 18px;
        font-weight: bold;
      }
    }

  }
}
</style>
