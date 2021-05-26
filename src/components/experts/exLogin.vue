<template>
  <div class="exLogin">
    <div class="exLogin-content">
      <div class="exLogin-content-logo">
        <img src="../../assets/expertImg/yj_zjk_ch.png" alt="" />
      </div>
      <div class="exLogin-content-login">
        <div class="login-text">欢迎登录</div>
        <div class="login-form">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
          >
            <el-form-item prop="username">
              <el-input
                v-model.trim="ruleForm.username"
                placeholder="请输入身份证号"
                :maxlength="18"
              >
              </el-input>
              <div class="image">
                <img src="../../assets/expertImg/yj_icon_sfz_l2.png" alt="" />
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model.trim="ruleForm.password"
                autocomplete="off"
                placeholder="请输入密码"
                :maxlength="16"
              ></el-input>
              <div class="image image-mm">
                <img src="../../assets/expertImg/yj_icon_mm.png" alt="" />
              </div>
            </el-form-item>
            <el-form-item>
              <el-button class="login-btn" @click="submitForm('ruleForm')"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
        <div class="login-footer">
          <div class="login-footer-text">
            <span @click="forgetPass">忘记密码?</span>
            <span></span>
            <span
              @click="loginRegistered"
              :class="{ isShow: isShow == 0 ? 'isShow' : '' }"
              >注册成为新专家</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginEx } from "./validation";
import { loginExpert } from "@/api/experts";
import { mapActions } from "vuex";
import { setTokenE, setUserE, setEditor, setUserCode } from "@/utils/expauth";
import { getQueryDegree, getsysData } from "@/api/experts";

export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        userType: "02",
      },
      rules: loginEx,
      isShow: 0,
    };
  },

  created() {
    getsysData().then((res) => {
      this.isShow = res.msg;
    });
  },

  methods: {
    ...mapActions("page", ["SET_STEP"]),

    /**
     * 专家库登录
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /**
           * 拿到this.ruleForm 进行登录请求
           */
          loginExpert(this.ruleForm).then((res) => {
            setUserE(JSON.stringify(res.data));
            setUserCode(JSON.stringify(res));
            if (res.code === 200) {
              //登陆成功
              this.$message({
                message: res.msg,
                center: true,
                type: "success",
              });
              setEditor(JSON.stringify(false));
              this.SET_STEP(5);
              setTokenE(res.token);
              this.$router.push({
                path: "/exhome/declare/inforList",
              });
              return;
            } else if (res.code === -1) {
              //账号已注册,待提交信息
              getQueryDegree(res.data.userId).then((res) => {
                this.$message({
                  message: res.msg,
                  center: true,
                  type: "success",
                });
                setEditor(JSON.stringify(true));
                this.SET_STEP(1);
                this.$router.push({
                  path: "/exhome/declare/inforList",
                });
                // if (res.data.step == 1) {
                //   this.SET_STEP(1);
                //   this.$router.push({
                //     path: "/exhome/declare/inforList",
                //   });
                // } else if (res.data.step == 2) {
                //   this.SET_STEP(2);
                //   this.$router.push({
                //     path: "/exhome/declare/evaluation",
                //   });
                // } else if(res.data.step == 3) {
                //   this.SET_STEP(3);
                //   this.$router.push({
                //     path: "/exhome/declare/technical",
                //   });
                // } else if(res.data.step == 4) {
                //   this.SET_STEP(4);
                //   this.$router.push({
                //     path: "/exhome/declare/professional",
                //   });
                // } else {
                //   this.SET_STEP(5);
                //   this.$router.push({
                //     path: "/exhome/declare/certificate",
                //   });
                // }
              });
            } else if (res.code === -2) {
              //账号审核中
              this.$message({
                message: res.msg,
                center: true,
                type: "warning",
              });
              this.$router.push({
                path: "/exhome/waiting",
              });
            } else if (res.code === -3) {
              //账号审核失败
              this.$message({
                message: res.msg,
                center: true,
                type: "warning",
              });
              this.$router.push({
                path: "/exhome/failure",
              });
            }
          });
        }
      });
    },

    /**
     * 跳转忘记密码
     */
    forgetPass() {
      this.$router.push({
        path: "/experts/pwd",
      });
    },

    /**
     * 跳转注册
     */
    loginRegistered() {
      if (this.isShow == 1) {
        this.$router.push({
          path: "/experts/registered",
        });
      } else {
        this.$message({
          message: '注册入口尚未开放',
          center: true,
          type: "warning",
        });
        return;
      }
    },
  },
};
</script>


<style lang="less">
@import "//at.alicdn.com/t/font_2366072_f32vr7u3d87.css";
.exLogin {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .exLogin-content {
    display: flex;
    justify-content: space-evenly;
    margin-top: 70px;
    width: 1000px;
    height: 635px;
    background: #ffffff;
    border-radius: 20px;
    .exLogin-content-logo {
      margin-top: 116px;
      width: 461px;
      height: 418px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .exLogin-content-login {
      position: relative;
      .login-text {
        margin-top: 144px;
        width: 115px;
        height: 26px;
        font-size: 26px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ca9540;
        line-height: 44px;
      }
      .login-form {
        margin-top: 59px;
        .image {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 20px;
          width: 23px;
          height: 17px;
          &.image-mm {
            left: 23px;
            width: 17px;
            height: 21px;
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .login-btn {
          width: 388px;
          height: 50px;
          background-color: #cda059;
          border-radius: 6px;
          outline: none;
          border: 0;
          font-size: 16px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
        }
        .el-form-item__content {
          margin-left: 0 !important;
          width: 388px;
          height: 50px;
          border-radius: 6px;
          margin-left: 0 !important;
          position: relative;
          .el-input {
            width: 100%;
            height: 100%;
            .el-input__inner {
              width: 100%;
              height: 100%;
              padding-left: 63px;
            }
          }
        }
      }

      .login-footer {
        position: absolute;
        width: 100%;
        bottom: 31px;
        display: flex;
        justify-content: center;
        span {
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #cda059;
          line-height: 44px;
          cursor: pointer;
          &:nth-of-type(2)::after {
            content: "";
            display: inline-block;
            height: 14px;
            width: 2px;
            margin: 0 17px;
            background: #dddddd;
          }
          &:not(span:nth-of-type(2)) {
            cursor: pointer;
            &.isShow {
              color: #eee;
              cursor: not-allowed;
            }
          }
        }
      }
    }
  }
}
</style>