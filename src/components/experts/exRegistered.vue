<template>
  <div class="exRegistered">
    <div class="exRegistered-content">
      <div class="exRegistered-content-logo">
        <img src="../../assets/expertImg/yj_zjk_ch.png" alt="" />
      </div>
      <div class="exRegistered-content-login">
        <div class="exRegistered-text">注册</div>
        <div class="exRegistered-form">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
          >
            <el-form-item prop="name">
              <el-input
                v-model.trim="ruleForm.name"
                placeholder="请输入姓名"
                :maxlength="50"
              >
              </el-input>
              <div class="image image-xm">
                <img src="../../assets/expertImg/yj_iicon_xm.png" alt="" />
              </div>
            </el-form-item>
            <el-form-item prop="idCard">
              <el-input
                v-model.trim="ruleForm.idCard"
                placeholder="请输入身份证号"
                :maxlength="18"
              >
              </el-input>
              <div class="image">
                <img src="../../assets/expertImg/yj_icon_sfz_l2.png" alt="" />
              </div>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                v-model.trim="ruleForm.email"
                placeholder="请输入邮箱"
              ></el-input>
              <div class="image image-yx">
                <img src="../../assets/expertImg/yj_icon_yx.png" alt="" />
              </div>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                v-model.trim="ruleForm.code"
                placeholder="请输入验证码"
                :maxlength="23"
              >
              </el-input>
              <div class="image image-yzm">
                <img src="../../assets/expertImg/yj_icon_yzm.png" alt="" />
              </div>
              <div class="yzm-text">
                <span v-if="showCode" @click="getVerCode">发送验证码</span>
                <span v-else style="color: #aaa">{{ codeTime }}s</span>
              </div>
            </el-form-item>
            <el-form-item prop="phonenumber">
              <el-input
                v-model.trim="ruleForm.phonenumber"
                placeholder="请输入手机号"
                :maxlength="11"
              ></el-input>
              <div class="image image-phone">
                <img src="../../assets/expertImg/yj_icon_sjh.png" alt="" />
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
                >注册</el-button
              >
              <div class="retu" @click="jumpLoigin">登录</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { regEx } from "./validation";
import { expertsRegistered } from "@/api/experts";
import { getCode } from "@/api/login";

export default {
  data() {
    return {
      ruleForm: {
        name: "", //姓名
        password: "", //密码
        idCard: "", //身份证
        email: "", //邮箱
        code: "", //验证码
        phonenumber: "", //手机号
        userType: "02", //用户类型专家为02
      },
      rules: regEx,
      //获取验证码相关参数
      showCode: true,
      codeTime: 60,
      codeTimer: null,
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /**
           * 拿到this.ruleForm 进行注册请求
           */
          expertsRegistered(this.ruleForm).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
                center: true,
              });
              //跳转到登录页面
              this.$router.push({
                path: "/experts/login",
              });
            }
          });
        }
      });
    },

    /**
     * 获取验证码
     */
    getVerCode() {
      let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g;
      if (!reg.test(this.ruleForm.email)) {
        this.$message({
          type: "error",
          message: "邮箱格式不正确！",
          center: true,
        });
        return;
      }
      getCode({
        email: this.ruleForm.email,
      }).then((res) => {
        if (res.code === 200) {
          this.showCode = false;
          this.codeTimer = setInterval(() => {
            if (this.codeTime <= 1) {
              clearInterval(this.codeTimer);
              this.showCode = true;
              this.codeTime = 60;
              return;
            }
            this.codeTime--;
          }, 1000);
          this.$message({
            type: "success",
            message: res.msg,
            center: true,
          });
        }
      });
    },

    /**
     * 跳转登录
     */
    jumpLoigin() {
      this.$router.push({
        path: "/experts/login",
      });
    },
  },
};
</script>


<style lang="less">
@import "//at.alicdn.com/t/font_2366072_f32vr7u3d87.css";
.exRegistered {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .exRegistered-content {
    display: flex;
    justify-content: space-evenly;
    margin-top: 70px;
    width: 1000px;
    height: 635px;
    background: #ffffff;
    border-radius: 20px;
    .exRegistered-content-logo {
      margin-top: 116px;
      width: 461px;
      height: 418px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .exRegistered-content-login {
      position: relative;
      .exRegistered-text {
        margin-top: 40px;
        font-size: 26px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ca9540;
        line-height: 44px;
      }
      .exRegistered-form {
        margin-top: 20px;
        .image {
          position: absolute;
          left: 20px;
          width: 23px;
          height: 17px;
          top: 50% !important;
          transform: translateY(-50%) !important;
          &.image-xm {
            left: 23px;
            width: 19px;
            height: 19px;
          }
          &.image-mm {
            left: 23px;
            width: 17px;
            height: 21px;
          }
          &.image-yzm {
            left: 23px;
            width: 18px;
            height: 22px;
          }
          &.image-phone {
            left: 24px;
            width: 16px;
            height: 22px;
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .yzm-text {
          position: absolute;
          height: 100%;
          top: 0;
          right: 21px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #cda059;
          line-height: 54px;
          cursor: pointer;
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
        .retu {
          width: 100%;
          text-align: center;
          line-height: 54px;
          color: #cda059;
          font-size: 16px;
          cursor: pointer;
        }
        .el-form-item {
          margin-bottom: 19px;
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
                vertical-align: middle;
                width: 100%;
                height: 100%;
                padding-left: 63px;
              }
            }
            .el-button {
              margin-left: 0 !important;
            }
          }
        }
      }
    }
  }
}
</style>