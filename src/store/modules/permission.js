import { constantRoutes, asyncRoutes } from "@/router";
function filterAsyncRoutes(routes, routesFlat) {
  return routes.reduce((state, route) => {
    if (route?.children?.length) {
      let children = filterAsyncRoutes(route.children, routesFlat);
      route.children = children;
      if (children.length) {
        state.push(route);
      }
    } else if (routesFlat.includes(route.code)) {
      state.push(route);
    }
    return state
  }, []);
}

const menu = {
  namespaced: true,
  state: {
    routes: [],
    asyncRoutes: [],
  },
  mutations: {
    SET_ROUTE: (state, asyncRoute) => {
      state.asyncRoutes = asyncRoute;
      state.routes = constantRoutes.concat(asyncRoute);
    },
    RESET_ROUTE: (state, routes) => {
      state.asyncRoutes = [];
      state.routes = [];
    },
  },
  actions: {
    generateRoutes: async ({ state, commit }, routeCodeFromEnd) => {
      // routeCodeFromEnd.push('ResultDetail')
      const asyncRoute = filterAsyncRoutes(asyncRoutes, routeCodeFromEnd);
      asyncRoute.push({ path: "*", redirect: "/404", hidden: true });
      return new Promise((resolve) => {
        commit("SET_ROUTE", asyncRoute);
        resolve(asyncRoute);
      });
    },
  },
  getters: {
    routes: (state) => state.asyncRoutes,
  },
};
export default menu;
