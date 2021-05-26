<template>
  <div class="eval-editor">
    <div class="infor-title">
      <div class="infor-title-all">
        <div class="infor-title-icon"></div>
        <div class="infor-title-title">
          <span>评标专业</span>
        </div>
      </div>
      <div class="infor-title-hr"></div>
    </div>
    <div class="evaluation-content">
      <div class="infor-evaluation-add" @click="evalAddClick">添加</div>
      <el-table
        :data="exalData"
        style="width: 100%"
        :header-cell-style="headerClass"
        :cell-style="textClass"
      >
        <el-table-column
          prop="majorName"
          label="评标专业"
          width="430"
        ></el-table-column>
        <el-table-column
          prop="isSenior"
          label="是否资深"
          width="350"
        ></el-table-column>
        <el-table-column prop="sysFileFilename" label="附件" width="300">
          <template slot-scope="scope">
            <div
              v-text="scope.row.sysFileFilename"
              @click="sysFileFunc(scope.row)"
            ></div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div
              class="oper-btn oper-edit"
              @click="editClick(scope.row, scope.$index)"
            >
              <div class="edit-icon">
                <img src="@a/expertImg/yj_zjk_bj.png" alt="" />
              </div>
              <div class="oper-text">
                <span>编辑</span>
              </div>
            </div>
            <div class="oper-btn" @click="removeClick(scope.$index)">
              <div class="oper-icon">
                <img src="@a/expertImg/yj_zjk_sc.png" alt="" />
              </div>
              <div class="oper-text">
                <span>删除</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="declare-btn">
      <el-row>
        <button class="up-btn" @click.prevent="pathClick('inforList', 1)">
          上一步
        </button>
        <button class="down-btn" @click.prevent="pathClick('technical', 3)">
          下一步
        </button>
      </el-row>
    </div>
    <el-dialog
      :title="dialogBoolEval ? '添加' : '编辑评标专业'"
      width="700"
      :visible.sync="evalVisible"
      :before-close="handleClose"
    >
      <el-form
        :model="exalForm"
        ref="exalForm"
        :label-position="labelPosition"
        label-width="120px"
        :rules="rule"
      >
        <el-row>
          <el-form-item label="专业" prop="major">
            <div class="block">
              <el-cascader
                v-model="exalForm.major"
                :options="optionsProfess"
                ref="majorCode"
              ></el-cascader>
            </div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="是否资深" prop="isSenior">
            <el-select v-model="exalForm.isSenior" placeholder="请选择">
              <el-option
                v-for="item in optionsEm"
                :key="item.id"
                :label="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="附件" prop="sysFileFilename">
            <div class="certificate-img">
              <el-upload
                class="avatar-uploader"
                action="/api/file/upload/common"
                :show-file-list="false"
                :accept="cardAccept"
                :on-success="handleCertSuccess"
                :before-upload="beforeAvatarUpload"
                :data="datas"
              >
                <div v-if="certImageUrl" class="imgages">
                  <img :src="certImageUrl" class="avatar" />
                </div>
                <div
                  v-if="certImageUrl"
                  class="images-icon"
                  @click.stop="handleRemove"
                ></div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <div class="certificate-text">
              <span>（支持 jpg 、jpeg、png、bmp格式）</span>
            </div>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="dialog-foote">
        <div class="edu-btn-add" @click="evalCopyClick('exalForm')">
          {{ dialogBoolEval ? "添加" : "保存" }}
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" title="预览">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { getUserE } from "@/utils/expauth";

import {
  addEvaluateMajor,
  getProfessional,
  getEvaluateMajorList,
} from "@/api/experts";
import { mapActions } from "vuex";
import { getEditor } from "@/utils/expauth";

export default {
  data() {
    // var sysFileRules = (rule, value, callback) => {
    //   if (!this.certImageUrl) {
    //     callback(new Error("请上传附件"));
    //   } else if (!this.exalForm.fileId && !this.exalForm.sysFilePath) {
    //     callback(new Error("请上传附件"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      dialogBoolEval: true, //true 添加  false编辑
      cardAccept: ".jpg,.png,.jpeg,.bmp",
      rule: {
        major: [
          {
            required: true,
            message: "请输入评标专业",
            trigger: "blur",
          },
        ],
        isSenior: [
          {
            required: true,
            message: "请选择是否资深",
            trigger: "blur",
          },
        ],
        // sysFileFilename: [
        //   {
        //     validator: sysFileRules,
        //     required: true,
        //     message: "请上传附件",
        //     trigger: "blur",
        //   },
        // ],
      },
      exalForm: {
        //评标专业需求数据对象
        bidMemberId: "",
        major: "",
        isSenior: "",
        fileId: 0,
      },
      datas: {
        categoryCode: "profess_cert",
      },
      exalData: [], //评标专业列表
      setEditor: false,
      evalVisible: false, //评标专业添加弹框开关
      dicType: "trade_type", //行业字典类型
      optionsEm: [
        //是否资深
        {
          id: 0,
          value: "是",
        },
        {
          id: 1,
          value: "否",
        },
      ],
      certImageUrl: "", //添加状态url
      labelPosition: "right",
      editAddIndex: 0, //编辑index
      optionsProfess: [],
      page: {
        bidMemberId: 0,
        pageNum: 1,
        pageSize: 10,
      },
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },

  created() {
    this.setEditor = JSON.parse(getEditor());
    this.exalForm.bidMemberId = JSON.parse(getUserE()).userId;
    this.page.bidMemberId = this.exalForm.bidMemberId;
    this.SET_STEP(2);
    ////所学专业
    getProfessional({
      dictType: "expert_major_type",
    }).then((res) => {
      this.optionsProfess = res.data;
    });

    getEvaluateMajorList(this.page).then((res) => {
      if (res.code === 200) {
        this.exalData = res.rows;
      }
    });
  },

  methods: {
    ...mapActions("page", ["SET_STEP"]),
    //表单表头颜色
    headerClass() {
      return "background: #F8F8F8;text-align:center;";
    },
    //表格内容居中
    textClass() {
      return "text-align:center;";
    },
    /**
     * 评价专业添加功能预留接口
     */
    evaluationAddClick() {
      this.evalVisible = true;
    },
    sysFileFunc(row) {
      this.dialogImageUrl =
        row.sysFilePath.indexOf(location.origin) == -1
          ? location.origin + "/api" + row.sysFilePath
          : row.sysFilePath;
      this.dialogVisible = true;
    },
    /**
     * 评价专业编辑功能预留接口
     */
    editClick(data, index) {
      this.evalVisible = true;
      this.dialogBoolEval = false;
      this.exalForm = Object.assign({}, data);
      this.exalForm.major = data.majorList
        ? JSON.parse(data.majorList)
        : data.major;
      this.certImageUrl =
        data.sysFilePath && data.sysFilePath.indexOf(location.origin) == -1
          ? location.origin + "/api" + data.sysFilePath
          : data.sysFilePath;
      this.editAddIndex = index;
    },

    /**
     * 评价专业删除功能预留接口
     */
    removeClick(index) {
      this.editAddIndex = index;
      this.$confirm("是否确认删除该条记录?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
        customClass: "message-box",
      })
        .then(() => {
          this.exalData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    /**
     * 限制文件上传大小
     */
    beforeAvatarUpload(file) {
      const isJPG =
        file.type == "image/jpeg" ||
        file.type == "image/jpg" ||
        file.type == "image/png" ||
        file.type == "image/bmp";
      if (!isJPG) {
        this.$message.error("上传图片仅支持 jpg 、jpeg、png、bmp格式！");
      }
      return isJPG;
    },

    //删除图片接口预留
    handleRemove() {
      this.certImageUrl = "";
      this.exalForm.sysFileFilename = "";
      this.exalForm.sysFileId = "";
      this.exalForm.sysFilePath = "";
      console.log(this.exalForm);
      this.exalData.forEach((item, index) => {
        if (this.editAddIndex == index) {
          item.sysFileFilename = "";
          item.sysFileId = "";
          item.sysFilePath = "";
        }
      });
    },

    //上传成功
    handleCertSuccess(res, file) {
      this.certImageUrl = location.origin + "/api" + res.data.filePath;
      this.exalForm.fileId = res.data.id;
      this.exalForm.sysFileFilename = res.data.filename;
    },

    handleClose() {
      //评标专业需求数据对象
      this.evalVisible = false;
      this.exalForm.major = "";
      this.exalForm.isSenior = "";
      this.certImageUrl = "";
    },

    /**
     * 添加+编辑保存的工具函数
     */
    utilClick(form, arrForm, type, index, sysFilePath) {
      let majorCode = this.$refs["majorCode"].getCheckedNodes()[0].pathLabels;
      form.majorName = majorCode[majorCode.length - 1];
      if (type) {
        arrForm.push({
          ...form,
          sysFilePath,
        });
      } else {
        this.$set(arrForm, index, {
          ...form,
          sysFilePath,
        });
      }
    },

    /**
     * 保存事件
     */
    evalCopyClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let sysFilePath = this.certImageUrl;
          let index = null;
          if (!this.dialogBoolWork) {
            index = this.editAddIndex;
          }

          this.utilClick(
            this.exalForm,
            this.exalData,
            this.dialogBoolEval,
            index,
            sysFilePath
          );
          this.evalVisible = false;
          this.exalForm.major = "";
          this.exalForm.isSenior = "";
          this.certImageUrl = "";
        }
      });
    },

    /**
     * 跳转到技术职称
     * 提交一些暂存信息
     *
     */

    pathClick(path, stepIndex) {
      //下一步提交信息
      if (path === "technical") {
        let exalData = this.exalData;
        exalData = exalData.map((item) => {
          return {
            majorList: item.majorList
              ? item.majorList
              : JSON.stringify(item.major),
            
            bidMemberId: item.bidMemberId,
            fileId: item.fileId || +item.sysFileId,
            major: item.major instanceof Array
                ? item.major[item.major.length - 1]
                : item.major,
            isSenior: item.isSenior
          };
        });

        addEvaluateMajor(exalData).then((res) => {
          if (res.code === 200) {
            this.$router.push({
              path: `/exhome/declare/${path}`,
            });
            if (this.setEditor) {
              this.SET_STEP(stepIndex);
            }
          }
        });
      } else {
        //上一步跳转路由
        this.$router.push({
          path: `/exhome/declare/${path}`,
        });
        if (this.setEditor) {
          this.SET_STEP(stepIndex);
        }
      }
    },

    /**
     * 添加 评价专业
     */
    evalAddClick() {
      this.evalVisible = true;
      this.dialogBoolEval = true;
      this.certImageUrl = "";
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.el-table {
  width: 1550px !important;
  margin-left: 45px;
  margin-right: 45px;
  .el-table__row {
    > td {
      &:nth-of-type(3) {
        .cell {
          cursor: pointer;
          color: #cda059;
        }
      }
      &:nth-of-type(4) {
        .cell {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
.eval-editor {
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
  .infor-evaluation-add {
    margin-left: 45px;
    margin-bottom: 15px;
    width: 80px;
    height: 36px;
    line-height: 36px;
    background: #cda059;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #ffffff;
    text-align: center;
    &:hover {
      background: rgba(205, 160, 89, 0.7);
    }
  }

  .evaluation-content {
    flex: 1;
    .oper-btn {
      display: flex;
      justify-content: center;
      width: 74px;
      height: 34px;
      line-height: 34px;
      border-radius: 4px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      background: #ee6e55;
      cursor: pointer;
      &:hover {
        background: rgba(238, 110, 85, 0.7);
      }

      &:nth-of-type(2) {
        margin-left: 20px;
      }
      .oper-text {
        margin-left: 6px;
      }

      .edit-icon {
        width: 14px;
        height: 14px;
        > img {
          display: inline-block;
          width: 14px;
          height: 14px;
        }
      }

      .oper-icon {
        width: 14px;
        height: 14px;
        > img {
          display: inline-block;
          width: 14px;
          height: 14px;
        }
      }

      &.oper-edit {
        background: #cda059;
        &:hover {
          background: rgba(205, 160, 89, 0.7);
        }
      }
    }
  }
  .declare-btn {
    // margin-top: 80px;
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
  /deep/.certificate-img {
    display: flex;
    > div {
      display: flex;
    }
    .avatar-uploader {
      .el-upload {
        overflow: visible !important;
        border: 1px dashed #d9d9d9 !important;
      }
      .imgages {
        background: #f8f8f8;
      }
    }
    .el-upload-list {
      display: flex;
      .el-upload-list__item {
        background: #f8f8f8;
        position: relative;
        outline: none;
        overflow: visible;
        width: 184px;
        height: 133px;
        margin: 0;
        margin-right: 30px;
      }
    }
    .el-upload--picture-card {
      width: 184px;
      height: 133px;
      border: 1px solid #eeeeee;
      background-color: #fff;
    }

    .el-upload-list__item-thumbnail {
      width: 182px;
      height: 131px;
      border-radius: 6px;
    }
    .images-icon {
      position: absolute;
      display: block;
      background-image: url("~@a/expertImg/yj_icon_ygb .png");
      background-size: 100% 100%;
      background-position: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      top: -20px;
      right: -20px;
      cursor: pointer;
    }

    > img {
      width: 184px;
      height: 133px;
    }
    .avatar-uploader .el-upload {
      border: 1px solid #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 184px;
      height: 133px;
      line-height: 133px;
      text-align: center;
    }
    .avatar {
      //图片
      width: 184px;
      height: 133px;
      display: block;
      border-radius: 6px;
      object-fit: contain;
    }
  }
}
</style>