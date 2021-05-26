<template>
  <div class="failure">
    <div class="failure-img">
      <img src="@a/expertImg/yj_img_no.png" alt="" />
    </div>
    <div class="failure-title">很抱歉，申报审核失败</div>
    <div class="failure-sub">
      <div>原因：</div>
      <p class="failure-text">{{ examineRemark }}</p>
    </div>
    <div class="failure-btn" @click="failureClkick">修改</div>
  </div>
</template>

<script>
import { setEditor } from "@/utils/expauth";
import { mapActions } from "vuex";
import { getQueryDegree } from "@/api/experts";
import { getUserE } from "@/utils/expauth";

export default {
  data() {
    return {
      setEditor: false,
      examineRemark: "",
    };
  },
  created() {
    let bidMemberId = JSON.parse(getUserE()).userId;
    getQueryDegree(bidMemberId).then((res) => {
      if (res.code === 200) {
        this.examineRemark = res.data.examineRemark;
      }
    });
  },

  methods: {
    ...mapActions("page", ["SET_STEP"]),
    //修改跳转
    failureClkick() {
      setEditor(JSON.stringify(true));
      this.SET_STEP(1);
      this.$router.push({
        path: `/exhome/declare/inforList`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.failure {
  height: 827px;
  background: #fff;
  width: 100%;
  margin-top: -10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .failure-img {
    width: 417px;
    height: 194px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .failure-title {
    margin-top: 52px;
    font-size: 28px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #e1591d;
  }
  .failure-sub {
    line-height: 20px;
    float: left;
    height: 50px;
    margin-right: 10px;
    text-align: center;
    width: 40%;
    word-break: break-all;
    margin-top: 28px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    text-align: center;
    color: #999999;
    .failure-text {
      display: inline-block;
      text-align: left;
    }
  }

  .failure-btn {
    cursor: pointer;
    margin-top: 60px;
    width: 329px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #cda059;
    border-radius: 25px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>