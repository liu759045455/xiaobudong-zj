<template>
  <div class="waiting">
    <div class="waiting-img">
      <img src="@a/expertImg/yj_zjk_sh.png" alt="" />
    </div>
    <div class="waiting-text">
      恭喜，申报提交成功，我们将会在
      <span>1个工作日内</span>
      审核完成，请您及时关注申报页面
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getQueryDegree } from "@/api/experts";
import { getUserE, setEditor } from "@/utils/expauth";

export default {
  created() {
    let bidMemberId = JSON.parse(getUserE()).userId;
    getQueryDegree(bidMemberId).then((res) => {
      if (res.code === 200) {
        if (res.data.auditStatus == 2) {
          this.$message({
            message: "审核成功,请重新登录",
            type: "success",
            center: true,
          });
          this.$router.push({
            path: `/experts/login`,
          });
        } else if (res.data.auditStatus == 3) {
          this.$message({
            message: "审核失败,请重新登录",
            type: "warning",
            center: true,
          });
          this.$router.push({
            path: `/experts/login`,
          });
          // this.$router.push({
          //   path: `/exhome/failure`,
          // });
        }
      }
    });
  },

  methods: {
    ...mapActions("page", ["SET_STEP"]),
  },
};
</script>

<style lang="less" scoped>
.waiting {
  height: 827px;
  background: #fff;
  width: 100%;
  margin-top: -10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .waiting-img {
    width: 421px;
    height: 282px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .waiting-text {
    margin-top: -16px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666666;
    span {
      color: #ffc404;
    }
  }
}
</style>