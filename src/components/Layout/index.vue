<template>
  <div class="layout">
    <!-- <FloatFrame class="float-wrapper" /> -->
    <WLayout
      v-bind="layoutAttrs"
      :has-hambuger="false"
      :has-breadcrumb="false"
      :user="user"
      @logout="logout"
    >
      <template #navLeft>
        <img style="margin-left:75px;width: 200px;height: 45px;" :src="$store.state.system.setting.homepageLogo" alt="">
      </template>
      <template #navCenter>
        <span class="title">{{ title }}</span>
      </template>
      <template #navRight>
        <div class="time">
          {{ curTime }}
        </div>
      </template>
      <template #dropdownItems>
        <el-dropdown-item divided @click.native="logout">
          <span style="display: block">退出</span>
        </el-dropdown-item>
      </template>
    </WLayout>
    <!-- <DownLoad /> -->
  </div>
</template>

<script>
import WLayout from "@common-ui/w-layout";
// import { routes } from '@/router'
import dayjs from "dayjs";
// import DownLoad from '@/components/DownLoad/index.vue'
export default {
  name: "IndexVue",
  components: {
    WLayout,
    // DownLoad
  },
  data() {
    return {
      opened: true,
      layoutAttrs: {
        menu: this.$store.state.permission.routes,
        navBgColor: "unset",
      },
      curTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      user: this.$store.state.user.userInfo,
      timer: null,
    };
  },
  computed:{
    title() {
      return this.$store.state.system.setting.title || "车辆360°动态图像智能检测系统";
    },
  },
  beforeDestroy() {
    this.clearTimer();
  },
  mounted() {
    console.log(this.$store.state.permission.routes);
    // // eslint-disable-next-line no-debugger
    // debugger
    if (this.timer) {
      this.clearTimer();
    }
    this.timer = setInterval(() => {
      this.curTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
    }, 1000);
    // const params = {
    //   pageSize: 10,
    //   pageIndex: 1,
    //   statusList: [],
    // };
    // this.$store.dispatch("importRecord/polling", params);
  },
  methods: {
    toggleSideBar() {
      this.opened = !this.opened;
    },
    clearTimer() {
      clearInterval(this.timer);
      this.timer = null;
    },
    logout() {
      this.$confirm("确认退出登录", "提醒", {
        type: "warning",
        confirmButtonText: "确认", //确认按钮的文字显示
        cancelButtonText: "取消", //取消按钮的文本内容
      }).then(async () => {
        await this.$store.dispatch("user/logout");
        this.$store.commit("permission/RESET_ROUTE");
        setTimeout(()=> {
          window.location.href =`${window.location.origin}${window.location.pathname}` ;
        })
      });
    },
  },
};
</script>

<style scoped lang="scss">
.layout {
  background: #060f2b;
  ::v-deep {
    .sidebar-container {
      height: calc(100vh - 110px) !important;
      width: 230px !important;
      left: 16px !important;
      top: 110px !important;
      background-color: unset !important;
      padding-top: 21px;
      .el-scrollbar__view {
        .el-menu {
          background-color: #011243 !important;
        }
      }
    }
    .navbar {
      height: 110px !important;
      background: url("~@/assets/images/bg_navigation.png") !important;
      background-size: 100% 100% !important;
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
      .title {
        transform: translate(-50%, -50%);
        font-size: 28px;
        color: #1cdafc;
        font-weight: bold;
        position: absolute;
        top: 50%;
        left: 50%;
      }
    }
    .main-container {
      margin-left: 240px !important;
      .app-main {
        height: calc(100vh - 120px) !important;
        background: unset;
        overflow: hidden;
      }
    }
  }
  

  .app-wrapper {
    background: #060f2b;
    position: relative;
    height: calc(100% - 30px) !important;
    width:1900px !important;
    min-width: 500px;
    margin: 0 auto;
  }
  .navLeft {
    font-weight: bold;
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 10px;
    img {
      display: block;
      max-height: 100%;
    }
  }
  .time {
    font-weight: 500;
  }
  .float-wrapper {
    position: absolute;
    z-index: 2;
    top: 74px;
    right: 20px;
  }
}
</style>
<style lang="scss">
$--sidebar: unset;

// default
$--sidebar-front-defalut: #fff;

// hover
$--sidebar-front-hover: #fff;
$--sidebar-item-hover: #04489b;

// active
$--sidebar-front-active: #1cdafc;
$--sidebar-item-active: unset;
#app {
  .nav-container {
    background: $--sidebar;
    background-color: $--sidebar;

  }
  .sidebar-container {
    .el-menu {
      height: calc(100% - 30px) !important;
      background: $--sidebar;
      background-color: $--sidebar;

      .el-menu-item {
        color: $--sidebar-front-defalut !important;
      }
      .el-menu-item:hover {
        color: $--sidebar-front-hover !important;
        background: $--sidebar-item-hover !important;
        background-color: $--sidebar-item-hover !important;

      }
      .el-menu-item.is-active,
      .el-submenu__title {
        background: $--sidebar-item-active !important;
        background-color: $--sidebar-item-active !important;

        color: $--sidebar-front-active !important;
      }
    }

    .el-submenu {
      .el-submenu__title {
        color: $--sidebar-front-defalut !important;
        background: none !important;
        background-color: none !important;

      }

      .el-menu-item,
      .el-menu-item.is-active {
        background: none !important;
        background-color: none !important;
      }
    }

    .el-submenu.is-active,
    .el-submenu:hover {
      .el-submenu__title {
        color: $--sidebar-front-hover !important;
        background-color: $--sidebar-item-hover !important;
        background: $--sidebar-item-hover !important;

      }
    }
  }
}

// fix scrollBar
.sidebar-container{
    margin-right: 0;
   .scrollbar-wrapper{
      &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
   }
}
</style>
