<template>
  <div class="bidlist">
    <div class="top-style">
      <span></span>
      <p>消息通知</p>
    </div>
    <div class="list-style">
      <ul v-if="MassageList.length">
        <li v-for="(item, index) in MassageList" :key="index">
          <span class="icon-style"></span>
          <span class="font-style"  v-if="
              item.value == 1 ||
              item.value == 2 ||
              item.value == 3 ||
              item.value == 4 ||
              item.value == 5
            ">
            {{item.messageContent.substring( 0,item.messageContent.length - 2)}}
           </span>
          <span class="font-style" v-else>{{ item.messageContent }}</span>

          <span class="date-style">{{ item.createTime }}</span>

          <span
            v-if="
              item.value == 1 ||
              item.value == 2 ||
              item.value == 3 ||
              item.value == 4 ||
              item.value == 5
            "
          >
            <el-rate disabled v-model="item.value"> </el-rate>
          </span>
        </li>
      </ul>
      <div class="no-alerts" v-else>
        <div class="alerts-img">
          <img src="@a/expertImg/yj_icon_soso.png" alt="" />
        </div>
        <div class="alerts-text">暂无消息通知</div>
      </div>
    </div>
  </div>
</template>
<script>
import { NewList } from "@/api/experts";
import { getUserE } from "@/utils/expauth";

export default {
  data() {
    return {
      userInfo: JSON.parse(getUserE()),
      total: null,
      MassageList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      NewList(this.userInfo.userId).then((res) => {
        this.MassageList = res.rows;
        this.MassageList.forEach((item) => {
          this.$set(
            item,
            "value",
            Number(item.messageContent[item.messageContent.length - 2])
          );
          if (
            item.messageContent[item.messageContent.length - 2] == 1 ||
            item.messageContent[item.messageContent.length - 2] == 2 ||
            item.messageContent[item.messageContent.length - 2] == 3 ||
            item.messageContent[item.messageContent.length - 2] == 4 ||
            item.messageContent[item.messageContent.length - 2] == 5
          ) {
            item.messageContent.substring(
              item.messageContent.length - 2,
              item.messageContent.length - 1
            );
            console.log(item.messageContent);
            console.log(
              item.messageContent.substring(
                item.messageContent.length - 2,
                item.messageContent.length - 1
              )
            );
          }
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
    margin: 12px 0 0px;
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
  .list-style {
    height: calc(100% - 58px);
    ul {
      li {
        display: flex;
        position: relative;
        align-items: center;
        padding: 30px 0;
        border-bottom: 1px solid #eee;
        .icon-style {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #cda059;
          margin-right: 10px;
        }
        .font-style {
          font: 400 14px/1 "";
          color: #333;
        }
        .date-style {
          font: 400 14px/1 "";
          color: #999;
          position: absolute;
          right: 7px;
        }
      }
    }
    .no-alerts {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .alerts-img {
        width: 417px;
        height: 194px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .alerts-text {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        // color: #999999;
      }
    }
  }

  
}
</style>