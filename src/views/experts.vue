<template>
  <div class="experts">
    <div class="header">
      <img src="~@a/expertImg/yj_zjk_name.png" alt="">
    </div>
    <router-view></router-view>
  </div>
</template>


<style lang="less">
.experts {
  width: 100%;
  height: 100%;
  background-image: url("~@a/expertImg/yj_zjk_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .header {
    width: 457px;
    height: 58px;
    position: absolute;
    left: 50%;
    top: 70px;
    transform: translateX(-50%);
  }
}
</style>