<template>
  <div class="bidlist">
    <div class="top-style">
      <span></span>
      <p>项目评分</p>
    </div>
    <section>
      <el-table class="customer-table" :data="ProList">
        <el-table-column label="项目名称" align="center" prop="projectName"></el-table-column>
        <el-table-column label="评标时间" align="center" prop="openTime"></el-table-column>
        <el-table-column label="评价时间" align="center" prop="commentTime"></el-table-column>
        <el-table-column label="评语" align="center" prop="comment" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="评价单位" align="center" prop="commentUnit"></el-table-column>
        <el-table-column label="综合评分" align="center" prop="score">
          <template slot-scope="scope">
            <el-rate
              v-model="scope.row.score"
              disabled
              show-text
              :texts='texts'>
            </el-rate>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination layout="prev, pager, next" :total="total" @current-change="Curchange"> </el-pagination>
    </section>
  </div>
</template>
<script>
import { ProjectList } from "@/api/experts";
import { getUserE } from "@/utils/expauth";

export default {
  data() {
    return {
      userInfo: JSON.parse(getUserE()),
      total: null,
      ProList:[],
      texts:["非常不满意","不满意","一般","满意","非常满意"],
      queryparams:{
        pageSize:10,
        pageNum:1
      }
    };
  },
  created() {
    this.getList()
  },
  methods: { 
    getList(){
      const data = {
        bidMemberId : this.userInfo.userId,
        pageSize:this.queryparams.pageSize,
        pageNum:this.queryparams.pageNum,
      }
      ProjectList(data).then(res=>{
        this.ProList = res.rows;
        this.total = res.total;
      })
    },
    Curchange(val){
      this.queryparams.pageNum = val
      this.getList()
    }
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

  section {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;

    .el-pagination {
      margin: 52px auto;
    }
  }
}



.customer-table th{
    border:none;
  }
.customer-table td,.customer-table th.is-leaf {
  border:none;
}
// 表格最外边框
.el-table--border, .el-table--group{
  border: none;
}
// 头部边框
.customer-table thead tr th.is-leaf{
  border: 1px solid #EBEEF5;
  border-right: none;
}
.customer-table thead tr th:nth-last-of-type(2){
  border-right: 1px solid #EBEEF5;
}
// 表格最外层边框-底部边框
.el-table--border::after, .el-table--group::after{
  width: 0;
}
.customer-table::before{
  width: 0;
}
.customer-table .el-table__fixed-right::before,.el-table__fixed::before{
  width: 0;
}
/deep/ .el-table th.is-leaf {
  border-bottom: none;
background: #F8F8F8;
}
</style>