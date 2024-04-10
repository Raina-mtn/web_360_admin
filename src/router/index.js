import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/components/Layout/index.vue";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};
export const constantRoutes = [
  {
    path: "/",
    component: Layout,
    name: "index",
    redirect: "/home",
    children: [],
  },
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/404",
    component: () => import("@/views/404.vue"),
  },
];

export const asyncRoutes = [
  {
    path: "/home",
    code: "Home",
    component: () => import("@/views/home/rewrite_index.vue"),
    meta: { title: "首页", icon: "icon-shouye-shouye" },
  },
  {
    path: "/patrolManage",
    code: "PatrolManage",
    alwaysShow: true,
    component: () => import("@/components/PageLayout.vue"),
    meta: { title: "检测管理", icon: "icon-shouye-shouye" },
    children: [
      {
        code: "TaskList",
        name: "TaskList",
        path: "/taskList",
        component: () => import("@/views/taskList/index.vue"),
        meta: { title: "检测任务" },
      },
      {
        code: "Report",
        path: "/report",
        component: () => import("@/views/report/index.vue"),
        meta: { title: "检测报告" },
      },
      {
        code: "Vehicle",
        path: "/vehicle",
        component: () => import("@/views/vehicle/index.vue"),
        meta: { title: "车辆管理" },
      },
      {
        code: "QuickPass",
        name: "QuickPass",
        path: "/quickPass",
        component: () => import("@/views/quickPass/index.vue"),
        meta: { title: "快速过图" },
      },
      {
        code: "PatrolAudit",
        name: "defectAudit",
        path: "/defectAudit",
        component: () => import("@/views/resultAudit/index.vue"),
        meta: { title: "告警复核" },
      },
      {
        code: "Defect",
        name: "Defect",
        path: "/defect",
        component: () => import("@/views/patrolRecordHistory/index.vue"),
        meta: { title: "历史告警" },
      },
    ],
  },
  {
    path: "/equipment",
    code: "Equipment",
    component: () => import("@/components/PageLayout.vue"),
    alwaysShow: true,
    meta: { title: "设备管理", icon: "icon-shouye-shouye" },
    children: [
      {
        code: "Online",
        path: "/online",
        component: () => import("@/views/equipmentStates/index.vue"),
        meta: { title: "在线状态" },
      },
      // {
      //   code: "Exception",
      //   path: "/exception",
      //   component: () => import("@/views/equipmentExceptions/index.vue"),
      //   meta: { title: "历史故障列表" },
      // },
    ],
  },
  {
    path: "/system",
    code: "System",
    component: () => import("@/components/PageLayout.vue"),
    meta: { title: "系统管理", icon: "icon-shouye-shouye" },
    children: [
      {
        code: "Role",
        path: "/role",
        component: () => import("@/views/system/role/index.vue"),
        meta: { title: "角色权限" },
      },
      {
        code: "User",
        path: "/user",
        component: () => import("@/views/system/user/index.vue"),
        meta: { title: "账号管理" },
      },
      {
        code: "BasisData",
        path: "/basisData",
        component: () => import("@/views/system/basisData/index.vue"),
        meta: { title: "基础数据" },
      },
      {
        code: "OperationLog",
        path: "/operationLog",
        component: () => import("@/views/system/log/index.vue"),
        meta: { title: "操作日志" },
      },
      {
        code: "SystemSetting",
        path: "/systemSetting",
        component: () => import("@/views/system/system/manage.vue"),
        meta: { title: "系统配置" },
      },
      {
        code: "Item",
        path: "/detectionAudit",
        component: () => import("@/views/system/detectionAudit/index.vue"),
        meta: { title: "检测项管理" },
      },
    ],
  },
];

const createRouter = () =>
  new VueRouter({
    routes: constantRoutes,
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
