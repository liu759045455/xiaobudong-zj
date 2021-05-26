import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "@/assets/styles/reset.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import webSocket from "@/utils/websocket.js";
import "@/assets/styles/common.less";
import $ from "jquery";
import deepClone from "@/utils/deepClone.js";
import constant from "@/utils/common.js";
import scroll, { vueSeamlessScroll } from "vue-seamless-scroll";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import utils from "@/utils/utils.js";
import * as echarts from "echarts";
import Viewer from "v-viewer";
import "viewerjs/dist/viewer.css";
// import {
//   getToken,
//   setToken,
//   removeToken
// } from "@/utils/auth.js";
import { getTokenE, setTokenE, removeTokenE } from "@/utils/expauth.js";
import "@/assets/styles/animate.css";
import directives from "@/utils/directives.js";
import { Message } from "element-ui";
import { checkLogin } from "@/api/login.js";

Vue.use(scroll);
Vue.use(ElementUI);
Vue.use(deepClone);
Vue.use(constant);
Vue.use(directives);
Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: "data-source"
  }
});
Vue.prototype.$echarts = echarts;
Vue.prototype.selectDictLabel = utils.selectDictLabel;
Vue.prototype.timeTransFor = utils.timeTransFor;
Vue.prototype.downloadFiles = utils.downloadFiles;
Vue.prototype.$webSocket = webSocket;

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (
    to.fullPath.indexOf("exhome") !== -1 ||
    to.fullPath.indexOf("experts") !== -1
  ) {
    if (to.fullPath === "/experts/login") {
      next();
      NProgress.done();
    } else {
      // debugger
      if (to.matched.some(m => m.meta.require)) {
        if (getTokenE()) {
          next();
          NProgress.done();
        } else {
          Message({
            type: "error",
            message: "需要登录之后才能继续操作！",
            center: true,
          });
          next("/experts/login");
          NProgress.done();
        }
      } else {
        next();
        NProgress.done();
      }
    }
    return;
  }

  // if (to.fullPath === "/login/index") {
  //   next();
  //   NProgress.done();
  // } else {
  //   if (to.matched.some(m => m.meta.require)) {
  //     if (getToken()) {
  //       checkLogin().then(result => {
  //         if (!result.isLogin) {
  //           Message({
  //             type: "warning",
  //             message: "长时间未操作，登录信息已失效！",
  //             center: true,
  //             duration: 2000
  //           });
  //           removeToken();
  //           location.reload();
  //         }
  //         routerDeal(to, from, next);
  //       });
  //     } else {
  //       Message({
  //         type: "error",
  //         message: "需要登录之后才能继续操作！",
  //         center: true,
  //         duration: 2000
  //       });
  //       next({
  //         path: "/login",
  //         query: {
  //           redirect: to.fullPath
  //         }
  //       });
  //       NProgress.done();
  //     }
  //   } else {
  //     routerDeal(to, from, next);
  //   }
  // }
});
router.afterEach(() => {
  NProgress.done();
});

// function routerDeal(to, from, next) {
//   if (Object.keys(from.query).length === 0) {
//     //判断路由来源是否有query，处理不是目的跳转的情况
//     next();
//     NProgress.done();
//   } else {
//     let redirect = from.query.redirect; //如果来源路由有query
//     if (to.path === redirect) {
//       //这行是解决next无限循环的问题
//       next();
//     } else {
//       next({
//         path: redirect
//       }); //跳转到目的路由
//     }
//     NProgress.done();
//   }
// }
new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
