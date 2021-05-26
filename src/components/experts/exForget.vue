<template>
  <div class="exForget">
    <div class="exForget-content">
      <div class="exForget-content-back">
        <div class="exForget-text">
          找回密码
          <div class="longTerm"></div>
        </div>

        <div class="exForget-form">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
          >
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
              <div class="image">
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
            <el-form-item prop="newPassWord">
              <el-input
                :type="typePass"
                v-model.trim="ruleForm.newPassWord"
                autocomplete="off"
                placeholder="请输入新密码"
                :maxlength="16"
              ></el-input>
              <div class="image image-mm">
                <img src="../../assets/expertImg/yj_icon_mm.png" alt="" />
              </div>
              <div class="pass-icon">
                <img
                  @click="typeFunc('text')"
                  src="../../assets/expertImg/yj_icon_xs.png"
                  alt=""
                />
                <img
                  @click="typeFunc('password')"
                  src="../../assets/expertImg/yj_icon_bxs.png"
                  alt=""
                />
              </div>
            </el-form-item>
            <el-form-item>
              <el-button class="exForget-btn" @click="submitForm('ruleForm')"
                >确定</el-button
              >
              <div class="retu" @click="returnLoigin">返回</div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { backEx } from "./validation";
import { getCode } from "@/api/login";
import { forgetExpert } from "@/api/experts";

export default {
  data() {
    return {
      ruleForm: {
        idCard: "", //身份证
        email: "", //邮箱
        newPassWord: "", //新密码
        code: "", //验证码
      },
      typePass: "password",
      rules: backEx,
      //获取验证码相关参数
      showCode: true,
      codeTime: 60,
      codeTimer: null,
    };
  },
  methods: {
    /**
     * 找回密码
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          /**
           * 拿到this.ruleForm 进行找回密码请求
           */
          forgetExpert(this.ruleForm).then((res) => {
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
        } else {
          return false;
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
     * 显示密码隐藏密码切换
     */
    typeFunc(type) {
      this.typePass = type;
    },

    /**
     * 返回登录
     */
    returnLoigin() {
      //   this.$router.push({
      //     path: "/experts/login",
      //   });
      this.$router.go(-1);
    },
  },
};
</script>


<style lang="less">
@import "//at.alicdn.com/t/font_2366072_f32vr7u3d87.css";

.exForget {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .exForget-content {
    margin-top: 70px;
    width: 1000px;
    height: 635px;
    background: #ffffff;
    border-radius: 20px;

    .exForget-content-back {
      .exForget-text {
        text-align: center;
        margin-top: 50px;
        width: 100%;
        height: 26px;
        font-size: 26px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #ca9540;
        line-height: 44px;
        .longTerm {
          width: 937px;
          height: 1px;
          margin-top: 41px;
          margin-left: 31px;
          background-color: #eee;
          color: #eee;
        }
      }
      .exForget-form {
        margin-top: 101px;
        display: flex;
        justify-content: center;
        .el-form-item {
          position: relative;

          .exForget-btn {
            width: 100%;
            height: 54px;
            background: #cda059;
            outline: none;
            border: 0;
            span {
              font-size: 16px;
              font-family: Microsoft YaHei;
              font-weight: 400;
              color: #ffffff;
            }
          }
          .retu {
            width: 100%;
            text-align: center;
            line-height: 54px;
            color: #cda059;
            font-size: 16px;
            cursor: pointer;
          }

          .image {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 20px;
            width: 23px;
            height: 17px;
            &.image-yzm {
              width: 18px;
              height: 22px;
            }
            &.image-mm {
              width: 17px;
              height: 21px;
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
          .pass-icon {
            position: absolute;
            top: 0;
            right: 20px;
            height: 100%;
            line-height: 54px;
            img {
              margin: 0 6px;
              line-height: 54px;
              cursor: pointer;
              &:nth-of-type(1) {
                display: inline-block;
                width: 18px;
                height: 12px;
              }
              &:nth-of-type(2) {
                display: inline-block;
                width: 17px;
                height: 8px;
              }
            }
          }
          .el-form-item__content {
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
      }
    }
  }
}
</style>