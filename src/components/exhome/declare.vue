<template>
  <div class="declare">
    <!-- 步骤条 -->
    <div class="declare-steps" v-if="$route.path != '/exhome/failure' && $route.path != '/exhome/waiting'">
      <div class="step-item step">
        <div class="round-icon round-icon-one">1</div>
        <div class="step-text">
          <span>基本信息</span>
        </div>
      </div>
      <div
        class="step-item step2"
        :class="{
          'step-uncheck':
            $store.state.page.stepIndex >= 2 ? '' : 'step-uncheck',
        }"
      >
        <div
          class="round-icon"
          :class="{
            'round-icon-color':
              $store.state.page.stepIndex >= 2 ? '' : 'round-icon-color',
          }"
        >
          2
        </div>
        <div class="step-text">
          <span>评标专业</span>
        </div>
      </div>
      <div
        class="step-item step2"
        :class="{
          'step-uncheck':
            $store.state.page.stepIndex >= 3 ? '' : 'step-uncheck',
        }"
      >
        <div
          class="round-icon"
          :class="{
            'round-icon-color':
              $store.state.page.stepIndex >= 3 ? '' : 'round-icon-color',
          }"
        >
          3
        </div>
        <div class="step-text">
          <span>技术职称</span>
        </div>
      </div>
      <div
        class="step-item step2"
        :class="{
          'step-uncheck':
            $store.state.page.stepIndex >= 4 ? '' : 'step-uncheck',
        }"
      >
        <div
          class="round-icon"
          :class="{
            'round-icon-color':
              $store.state.page.stepIndex >= 4 ? '' : 'round-icon-color',
          }"
        >
          4
        </div>
        <div class="step-text">
          <span>职业资格</span>
        </div>
      </div>
      <div
        class="step-item step3"
        :class="{
          'step-not':
            $store.state.page.stepIndex == 5 ? '' : 'step-not',
        }"
      >
        <div
          class="round-icon"
          :class="{
            'round-icon-color':
              $store.state.page.stepIndex == 5 ? '' : 'round-icon-color',
          }"
        >
          5
        </div>
        <div class="step-text">
          <span>相关证书</span>
        </div>
      </div>
    </div>
    <div class="declare-content" >
      <!-- 子路由 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
.declare {
  display: flex;
  flex-direction: column;
  width: 100%;
  .declare-steps {
    width: 100%;
    height: 120px;
    background: #fff;
    padding: 36px 45px 30px 45px;
    display: flex;
    justify-content: center;
    .step-item {
      width: 327px;
      height: 54px;
      display: flex;
      align-items: center;
      .round-icon {
        width: 32px;
        height: 32px;
        background: #fff;
        border-radius: 50%;
        color: #ac8458;
        line-height: 32px;
        text-align: center;
        margin-left: 60px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ac8458;
        &.round-icon-one {
          margin-left: 26px;
        }
        &.round-icon-color {
          font-size: 18px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #dddddd;
        }
      }
      .step-text {
        margin-left: 20px;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
      }
      &.step {
        background: url("../../assets/expertImg/yj_zjk_jbxx_h.png") no-repeat;
        background-size: 100% 100%;
      }
      &.step2 {
        background: url("../../assets/expertImg/yj_zjk_pbzy_h.png") no-repeat;
        margin-left: -23px;
      }
      &.step3 {
        background: url("../../assets/expertImg/yj_zjk_xgzs_h.png");
        margin-left: -23px;
      }
      &.step-uncheck {
        background: url("../../assets/expertImg/yj_zjk_pbzy.png");
        margin-left: -23px;
      }
      &.step-not {
        background: url("../../assets/expertImg/yj_zjk_xgzs.png");
        margin-left: -23px;
      }
    }
  }
  .declare-content {
    // display: flex;
    // flex-direction: column;
    // height: 697px;
    margin-top: 10px;
    background: #fff;
    .declare-btn {
      margin-top: 80px;
      margin-bottom: 98px;
      .el-row {
        display: flex;
        justify-content: center;
        .editor-btn {
          width: 118px;
          height: 36px;
          background: #fff5e5;
          border: 1px solid #cda059;
          border-radius: 4px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #cda059;
          cursor: pointer;
          margin-left: 30px;
          &:hover {
            background: rgba(255, 245, 229, 0.7);
          }
        }
        .up-btn {
          width: 118px;
          height: 36px;
          border: 1px solid #999999;
          border-radius: 4px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #666666;
          background: #fff;
          cursor: pointer;
          margin-left: 30px;
          &:hover {
            border: 1px solid #cda059;
            color: #cda059;
          }
        }
        .down-btn {
          width: 118px;
          height: 36px;
          background: #cda059;
          border-radius: 4px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          outline: none;
          border: 0;
          cursor: pointer;
          margin-left: 30px;
          &:hover {
            background: rgba(205, 160, 89, 0.7);
          }
        }
        .submit-btn {
          width: 118px;
          height: 36px;
          background: #87cd59;
          border-radius: 4px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          outline: none;
          border: 0;
          margin-left: 30px;
          cursor: pointer;
          &:hover {
            background: rgba(135, 205, 89, 0.7);
          }
        }
      }
    }
  }
}
</style>