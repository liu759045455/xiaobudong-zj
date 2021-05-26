<template>
  <div class="bidlist">
    <div class="top-style">
      <span></span>
      <p>修改密码</p>
    </div>
    <el-form label-width="120px" ref="formName" :model="query" :rules="rules">
      <el-form-item label="原始密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入原始密码"
          v-model.trim="query.password"
          :maxlength="16"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassWord">
        <el-input
          type="password"
          placeholder="请输入新密码"
          v-model.trim="query.newPassWord"
          :maxlength="16"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassWord">
        <el-input
          type="password"
          placeholder="请输入新密码"
          v-model.trim="query.confirmPassWord"
          :maxlength="16"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <button @click="Amend">修改</button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getUserE } from "@/utils/expauth";
import { AmendPass } from "@/api/experts";

export default {
  data() {
    return {
      userInfo: JSON.parse(getUserE()),
      total: null,
      query: {
        password: "",
        newPassWord: "",
        confirmPassWord: "",
      },
      rules: {
        password: [
          { required: true, message: "请输入原始密码", trigger: "blur" },
        ],
        newPassWord: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
            message: "6-16位大小写字母、数字、符号组合",
          },
        ],
        confirmPassWord: [
          { required: true, message: "再次输入新密码", trigger: "blur" },
          {
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
            message: "6-16位大小写字母、数字、符号组合",
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    Amend() {
      this.$refs["formName"].validate((valid) => {
        if (valid) {
          const data = {
            password: this.query.password,
            newPassWord: this.query.newPassWord,
            confirmPassWord: this.query.confirmPassWord,
          };
          AmendPass(data).then((res) => {
            if (res.code === 200) {
              this.$message({
                message: "密码修改成功，即将重新登录",
                type: "success",
                onClose: () => {
                  this.$router.push("/experts/login");
                },
              });
            }
          });
        } else {
          return false;
        }
      });
    },
  },
  components: {},
};
</script>
<style scoped lang="less">
.bidlist {
  height: 100%;
  display: flex;
  background: @white;
  flex-direction: column;
  padding: 0 45px;
  // position: relative;
  .top-style {
    margin: 12px 0 20px;
    display: flex;
    position: relative;
    // margin-top: 31px;
    // margin-left: 30px;
    border-bottom: 1px solid #eee;
    line-height: 57px;
    span {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 16px;
      background: #cda059;
    }
    p {
      margin-left: 10px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #333333;
    }
  }
  .el-form {
    .el-form-item {
      button {
        width: 240px;
        height: 40px;
        border: none;
        background: #cda059;
        border-radius: 4px;
        font: 400 14px/1 Microsoft YaHei;
        color: #ffffff;
        cursor: pointer;
      }
      /deep/.el-form-item__label {
        padding: 0 30px 0 0;
        font-size: 14px;
        font-family: Microsoft YaHei;
      }
      .el-form-item__content {
        .el-input {
          width: 240px;
        }
      }
    }
  }
}
</style>