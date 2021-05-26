import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [{
    path: "/",
    redirect: "/experts"
  },
  {
    path: "/experts",
    name: "专家库",
    component: () => import("@v/experts.vue"),
    children: [{
        path: "/experts",
        redirect: "/experts/login"
      },
      {
        path: "/experts/login",
        name: "专家库登录",
        component: () => import("@c/experts/exLogin.vue")
      },
      {
        path: "/experts/pwd",
        name: "专家库忘记密码",
        component: () => import("@c/experts/exForget.vue")
      },
      {
        path: "/experts/registered",
        name: "专家库注册",
        component: () => import("@c/experts/exRegistered.vue")
      }
    ]
  },
  {
    path: "/exhome",
    name: "专家库首页",
    component: () => import("@v/exhome.vue"),
    redirect: "/exhome/declare",

    children: [{
      path: "/exhome/declare",
      name: "专家库申报",
      component: () => import("@c/exhome/declare.vue"),
      children: [{
          path: "/exhome/declare",
          redirect: '/exhome/declare/inforList'
        }, {
          path: '/exhome/declare/inforList',
          name: "申报基本信息列表",
          component: () => import("@c/declareInfo/index.vue"),
        }, {
          path: '/exhome/declare/evaluation',
          name: "申报评价专业",
          component: () => import("@c/declareInfo/evaluation.vue"),

        }, {
          path: '/exhome/declare/technical',
          name: "申报技术职称",
          component: () => import("@c/declareInfo/technical.vue"),
        }, {
          path: '/exhome/declare/professional',
          name: "申报职业资格",
          component: () => import("@c/declareInfo/professional.vue"),
        }, {
          path: '/exhome/declare/certificate',
          name: "申报相关证书",
          component: () => import("@c/declareInfo/certificate.vue"),
        },
        {
          path: '/exhome/failure',
          name: "申报审核失败",
          component: () => import("@c/declareInfo/failure.vue"),
        }, {
          path: '/exhome/waiting',
          name: "申报等待审核",
          component: () => import("@c/declareInfo/waiting.vue"),
        }
      ]
    }, {
      path: "/exhome/bidlist",
      name: "专家库评标列表",
      component: () => import("@c/exhome/bidlist.vue"),
      meta: {
        require: true
      },
    }, {
      path: "/exhome/results",
      name: "专家库项目评分",
      component: () => import("@c/exhome/results.vue"),
      meta: {
        require: true
      },
    }, {
      path: "/exhome/cancellation",
      name: "专家库账号注销",
      component: () => import("@c/exhome/cancellation.vue"),
      meta: {
        require: true
      },
    }, {
      path: "/exhome/alerts",
      name: "专家库消息通知",
      component: () => import("@c/exhome/alerts.vue"),
      meta: {
        require: true
      },
    }, {
      path: "/exhome/chpass",
      name: "专家库修改密码",
      component: () => import("@c/exhome/chpass.vue"),
      meta: {
        require: true
      },
    }]
  }


];
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const router = new VueRouter({
  routes,
  linkActiveClass: "active-router"
});

export default router;