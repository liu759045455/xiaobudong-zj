<template>
  <div class="technical">
    <div class="infor-title">
      <div class="infor-title-all">
        <div class="infor-title-icon"></div>
        <div class="infor-title-title">
          <span>技术职称</span>
        </div>
      </div>
      <div class="infor-title-hr"></div>
    </div>
    <div class="technical-content">
      <el-table
        :data="technicalData"
        style="width: 100%"
        :header-cell-style="headerClass"
        :cell-style="textClass"
      >
        <el-table-column
          prop="technicalTitle"
          label="技术职称名称"
          width="352"
        ></el-table-column>
        <el-table-column
          prop="startTime"
          label="通过时间"
          width="368"
        ></el-table-column>
        <el-table-column
          prop="endTime"
          label="截止时间"
          width="500"
        ></el-table-column>
        <el-table-column prop="sysFileFilename" label="附件">
          <template slot-scope="scope">
            <div
              v-text="scope.row.sysFileFilename"
              @click="sysFileFunc(scope.row)"
            ></div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="declare-btn">
      <el-row>
        <button
          class="editor-btn"
          @click.prevent="stagingClick"
          v-show="setEditor"
        >
          暂存
        </button>
        <button class="up-btn" @click="pathClick('evaluation', 2)">
          上一步
        </button>
        <button class="down-btn" @click="pathClick('professional', 4)">
          下一步
        </button>
      </el-row>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="预览">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getEditor, getUserE } from "@/utils/expauth";
import { getTechnicalTitleList } from "@/api/experts";

export default {
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      technicalData: [],
      setEditor: false,
      page: {
        bidMemberId: 0,
        pageNum: 1,
        pageSize: 10,
      },
    };
  },

  created() {
    this.page.bidMemberId = JSON.parse(getUserE()).userId;
    this.setEditor = JSON.parse(getEditor());
    getTechnicalTitleList(this.page).then((res) => {
      if (res.code === 200) {
        this.technicalData = res.rows;
      }
    });
  },

  methods: {
    ...mapActions("page", ["SET_STEP"]),
    sysFileFunc(row) {
      console.log(row);
      this.dialogImageUrl = location.origin + "/api" + row.sysFilePath;
      this.dialogVisible = true;
    },
    //表单表头颜色
    headerClass() {
      return "background: #F8F8F8;text-align:center;";
    },
    //表格内容居中
    textClass() {
      return "text-align:center;";
    },

    /**
     * 跳转到职业资格
     * 提交一些暂存信息
     */
    pathClick(path, stepIndex) {
      if (this.setEditor) {
        this.SET_STEP(stepIndex);
      }
      this.$router.push({
        path: `/exhome/declare/${path}`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.technical {
  display: flex;
  flex-direction: column;
  height: 697px;
  .infor-title {
    .infor-title-all {
      display: flex;
      margin-top: 31px;
      margin-left: 45px;
      .infor-title-icon {
        width: 4px;
        height: 16px;
        background: #cda059;
      }

      .infor-title-title {
        margin-left: 10px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
      }
    }
    .infor-title-hr {
      width: 1549px;
      height: 1px;
      background: #eee;
      margin: 21px 45px 20px 45px;
    }
  }
  /deep/.el-table {
    width: 1550px !important;
    margin-left: 45px;
    margin-right: 45px;
    .el-table__row {
      > td {
        &:nth-of-type(4) {
          .cell {
            cursor: pointer;
            color: #cda059;
          }
        }

        &:nth-of-type(5) {
          .cell {
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
  .technical-content {
    flex: 1;
  }
  .declare-btn {
    margin-bottom: 80px;
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

  /deep/.el-dialog__wrapper {
    .el-dialog {
      width: 700px;
      .el-dialog__body {
        > img {
          object-fit: contain;
        }
        .el-form {
          .el-row {
            // display: flex;
            // justify-content: center;
            margin-bottom: 29px;
            margin-left: 60px;
            .el-input__inner {
              width: 386px;
            }
          }
        }
        .dialog-foote {
          display: flex;
          justify-content: center;
          .edu-btn-add {
            width: 120px;
            height: 36px;
            background: #cda059;
            border-radius: 4px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #ffffff;
            line-height: 36px;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>