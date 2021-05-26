<template>
  <div class="bidlist">
    <div class="top-style">
      <span></span>
      <p>账号注销</p>
    </div>
    <div class="bg">
      <img src="~@a/expertImg/yj_zjk_zx.png" alt="" />
      <p>账号注销后，您的信息将从专家库中删除，账号将无法登录。</p>
      <button @click="logout">注销</button>
    </div>
  </div>
</template>
<script>
import { getUserE } from "@/utils/expauth";
import { LogoutCancel } from "@/api/experts";
export default {
  data() {
    return {
      userInfo: JSON.parse(getUserE()),
      total: null,
    };
  },
  created() {},
  methods: {
    logout() {
      this.$confirm("确定要注销该账号吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const data = {
            id: this.userInfo.userId,
          };
          LogoutCancel(data).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: "注销成功!",
                onClose: () => {
                  this.$router.push("/experts/login");
                },
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
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
  .bg {
    text-align: center;
    margin-top: 175px;
    p {
      font-size: 18px;
      font-family: Microsoft YaHei;
      color: #333333;
      line-height: 44px;
    }
    button {
      width: 177px;
      height: 50px;
      background: #cda059;
      border-radius: 25px;
      border: none;
      color: #ffffff;
      font: 400 16px/1 Microsoft YaHei;
      margin-top: 39px;
      cursor: pointer;
    }
  }
}
</style>