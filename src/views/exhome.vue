<template>
  <div class="exhome">
    <!-- 头部logo+信息 -->
    <div class="exhome-header">
      <div class="exhome-logo">
        <span>专家库管理系统</span>
      </div>
      <div class="exhome-infor">
        <!-- <div class="exhome-infor-head">
          <img src="../assets/expertImg/ceshi.jpg" alt="" />
        </div> -->
        <div class="exhome-infor-name">
          <span>{{ nickName }}</span>
        </div>
        <div class="exhome-infor-stop" @click="exitLongin">
          <img src="../assets/expertImg/yj_zjk_tc .png" alt="" />
        </div>
        <div class="exhome-infor-exit" @click="exitLongin">
          <span>退出</span>
        </div>
      </div>
    </div>
    <!-- 主题内容区 -->
    <div class="container">
      <!-- 左侧导航条 -->
      <div class="nav">
        <div class="nav-logo">
          <div class="nav-logo-head">
            <img src="../assets/expertImg/yj_zjk_zjps.png" alt="" />
          </div>
          <div class="nav-logo-title">
            <span>专家评审管理</span>
          </div>
        </div>
        <div class="nav-menu">
          <el-menu>
            <el-menu-item-group>
              <el-menu-item
                index="1-1"
                :class="{
                  'is-active':
                    $route.path.indexOf('/exhome/declare') != -1 ||
                    $route.path.indexOf('/exhome/failure') != -1 ||
                    $route.path.indexOf('/exhome/waiting') != -1
                      ? 'is-active'
                      : '',
                }"
              >
                <div class="active" @click="declareClick">
                  <span>申报信息</span>
                </div>
              </el-menu-item>
              <template
                v-if="
                  $route.path != '/exhome/failure' &&
                  $route.path != '/exhome/waiting' && 
                  code != -1 && code != -3
                "
              >
                <el-menu-item
                  index="1-2"
                  :class="{
                    'is-active':
                      $route.path.indexOf('/exhome/bidlist') != -1
                        ? 'is-active'
                        : '',
                  }"
                >
                  <div
                    @click="bidlistClick"
                    :class="{ active: code == -1 ? '' : 'active' }"
                  >
                    <span>评标列表</span>
                  </div>
                </el-menu-item>
                <el-menu-item
                  index="1-3"
                  :class="{
                    'is-active':
                      $route.path.indexOf('/exhome/results') != -1
                        ? 'is-active'
                        : '',
                  }"
                >
                  <div
                    @click="resultsClick"
                    :class="{ active: code == -1 ? '' : 'active' }"
                  >
                    <span>项目评分</span>
                  </div>
                </el-menu-item>
                <el-menu-item
                  index="1-4"
                  :class="{
                    'is-active':
                      $route.path.indexOf('/exhome/cancellation') != -1
                        ? 'is-active'
                        : '',
                  }"
                >
                  <div
                    @click="cancellationClick"
                    :class="{ active: code == -1 ? '' : 'active' }"
                  >
                    <span>账号注销</span>
                  </div>
                </el-menu-item>
                <el-menu-item
                  index="1-5"
                  :class="{
                    'is-active':
                      $route.path.indexOf('/exhome/alerts') != -1
                        ? 'is-active'
                        : '',
                  }"
                >
                  <div
                    @click="alertsClick"
                    :class="{ active: code == -1 ? '' : 'active' }"
                  >
                    <span>消息通知</span>
                  </div>
                </el-menu-item>
                <el-menu-item
                  index="1-6"
                  :class="{
                    'is-active':
                      $route.path.indexOf('/exhome/chpass') != -1
                        ? 'is-active'
                        : '',
                  }"
                >
                  <div
                    @click="chpassClick"
                    :class="{ active: code == -1 ? '' : 'active' }"
                  >
                    <span>修改密码</span>
                  </div>
                </el-menu-item>
              </template>
            </el-menu-item-group>
          </el-menu>
        </div>
      </div>
      <!-- 右侧内容区 -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getUserCode,
  removeTokenE,
  removeUserE,
  removeEditor,
  removeUserCode,
} from "@/utils/expauth.js";

export default {
  data() {
    return {
      code: 0,
      nickName: "",
    };
  },
  created() {
    let user = JSON.parse(getUserCode());
    this.code = user.code;
    this.nickName = user.data.nickName;
  },
  methods: {
    /**
     * 点击退出到专家库登录界面
     */
    exitLongin() {
      removeTokenE();
      removeUserE();
      removeEditor();
      removeUserCode();
      this.$router.push({
        path: "/experts/login",
      });
    },
    /**
     * 申报信息跳转
     */
    declareClick() {
      if (this.$route.path.indexOf("/exhome/failure") != -1) {
        return;
      } else if (this.$route.path.indexOf("/exhome/waiting") != -1) {
        return;
      }
      this.$router.push({
        path: "/exhome/declare",
      });
    },
    /**
     * 警告
     */
    waring() {
      this.$message({
        message: "申报信息未完成不能点击!",
        type: "warning",
        center: true,
      });
    },

    /**
     * 评标列表
     */
    bidlistClick() {
      if (this.code !== -1) {
        this.$router.push({
          path: "/exhome/bidlist",
        });
      } else {
        this.waring();
        return;
      }
    },

    /**
     * 项目评分
     */
    resultsClick() {
      if (this.code !== -1) {
        this.$router.push({
          path: "/exhome/results",
        });
      } else {
        this.waring();
        return;
      }
    },

    /**
     * 账户注销
     */
    cancellationClick() {
      if (this.code !== -1) {
        this.$router.push({
          path: "/exhome/cancellation",
        });
      } else {
        this.waring();
        return;
      }
    },
    /**
     * 消息通知
     */
    alertsClick() {
      if (this.code !== -1) {
        this.$router.push({
          path: "/exhome/alerts",
        });
      } else {
        this.waring();
        return;
      }
    },

    /**
     * 修改密码
     */
    chpassClick() {
      if (this.code !== -1) {
        this.$router.push({
          path: "/exhome/chpass",
        });
      } else {
        this.waring();
        return;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.exhome {
  background-color: #f8f8f8;
  display: flex;
  // height: 100%;
  flex-direction: column;
  /* 头部logo+信息 */
  .exhome-header {
    width: 100%;
    height: 90px;
    background: #cda059;
    display: flex;
    justify-content: space-between;

    .exhome-logo {
      margin-left: 30px;
      line-height: 90px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
    .exhome-infor {
      display: flex;
      align-items: center;
      margin-right: 30px;
      color: #fff;
      // .exhome-infor-head {
      //   width: 50.1px;
      //   height: 50px;
      //   margin-right: 11px;
      //   border-radius: 50%;
      //   cursor: pointer;
      //   img {
      //     width: 100%;
      //     height: 100%;
      //     border-radius: 50%;
      //   }
      // }

      .exhome-infor-name {
        cursor: pointer;
        margin-right: 19px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
      }

      .exhome-infor-exit {
        cursor: pointer;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
      }

      .exhome-infor-stop {
        cursor: pointer;
        margin-right: 10px;
      }
    }
  }
  /* 主题内容区 */
  .container {
    flex: 1;
    display: flex;
    /* 左侧导航条 */
    .nav {
      width: 260px;
      height: 847px;
      // height: 100%;
      background: #fff;
      .nav-logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        .nav-logo-head {
          margin-top: 32px;
          width: 47px;
          height: 47px;
        }
        .nav-logo-title {
          margin-top: 19px;
          width: 100%;
          text-align: center;
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #cda059;
        }
      }
      .nav-menu {
        margin-top: 34px;
        .el-menu {
          border-right: 0;
          .el-menu-item-group {
            .el-menu-item-group__title {
              padding: 0 !important;
            }
            ul {
              li {
                width: 260px;
                height: 70px;
                line-height: 70px;
                background: #ffffff;
                border-bottom: 1px solid #eee;
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #666666;
                padding: 0 !important;
                text-align: center;
                &:nth-of-type(1) {
                  border-top: 1px solid #eee;
                }
                &.is-active {
                  height: 70px;
                  .active {
                    height: 100%;
                    // border-left: 4px solid #cda059;
                    background: rgba(205, 160, 89, 0.06);
                    color: #cda059;
                    &::before {
                      display: block;
                      position: absolute;
                      content: "";
                      width: 4px;
                      height: 70px;
                      background: #cda059;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    /* 右侧主体内容区 */
    .content {
      width: 100%;
      overflow-x: hidden;
      margin: 20px 0 0 20px;
    }
  }
}
</style>