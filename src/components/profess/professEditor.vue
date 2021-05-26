<template>
  <div class="professional">
    <div class="infor-title">
      <div class="infor-title-all">
        <div class="infor-title-icon"></div>
        <div class="infor-title-title">
          <span>职业资格</span>
        </div>
      </div>
      <div class="infor-title-hr"></div>
    </div>
    <div class="professional-content">
      <div class="infor-pro-add" @click="prpAddClick">添加</div>
      <el-table
        :data="proData"
        style="width: 100%"
        :header-cell-style="headerClass"
        :cell-style="textClass"
      >
        <el-table-column
          prop="registerTime"
          label="注册时间"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="overTime"
          label="过期时间"
          width="220"
        ></el-table-column>
        <el-table-column
          prop="dutyQualification"
          label="职业资格名称"
          width="250"
        ></el-table-column>
        <el-table-column
          prop="certificateNumber"
          label="职业资格证书号"
          width="250"
        ></el-table-column>
        <el-table-column
          prop="registerUnit"
          label="注册单位"
          width="260"
        ></el-table-column>
        <el-table-column prop="sysFileFilename" label="附件" width="160">
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
        <button class="up-btn" @click.prevent="pathClick('technical', 3)">
          上一步
        </button>
        <button class="down-btn" @click.prevent="pathClick('certificate', 5)">
          下一步
        </button>
      </el-row>
    </div>
    <el-dialog
      :title="dialogBoolPro ? '添加' : '编辑职业资格'"
      :visible.sync="dialogProVisible"
      width="700"
      :before-close="handleClose"
    >
      <el-form
        :model="professForm"
        ref="professForm"
        :label-position="labelPosition"
        label-width="120px"
        :rules="rule"
      >
        <el-row>
          <el-form-item label="注册时间" prop="registerTime">
            <el-date-picker
              v-model="professForm.registerTime"
              type="month"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM"
              placeholder="请选择"
              @change="changeStart"
            >
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="过期时间" prop="overTime">
            <el-date-picker
              v-model="professForm.overTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM"
              type="month"
              placeholder="请选择"
              @change="changeEnd"
            >
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="职业资格名称" prop="dutyQualification">
            <el-input
              v-model.trim="professForm.dutyQualification"
              placeholder="请输入"
              :maxlength="50"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="职业资格证书号" prop="certificateNumber">
            <el-input
              v-model.trim="professForm.certificateNumber"
              placeholder="请输入"
              :maxlength="50"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="注册单位" prop="registerUnit">
            <el-input
              v-model.trim="professForm.registerUnit"
              placeholder="请输入"
              :maxlength="50"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="附件" prop="sysFileFilename">
            <div class="certificate-img">
              <el-upload
                class="avatar-uploader"
                action="/api/file/upload/common"
                :show-file-list="false"
                :on-success="handleProSuccess"
                :before-upload="beforeAvatarUpload"
                :data="datas"
                :accept="cardAccept"
              >
                <div v-if="proImageUrl" class="imgages">
                  <img :src="proImageUrl" class="avatar" />
                </div>
                <div
                  v-if="proImageUrl"
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
        <div class="edu-btn-add" @click="proAddClick('professForm')">
          {{ dialogBoolPro ? "添加" : "保存" }}
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" title="预览">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getEditor, getUserE } from "@/utils/expauth";
import { addDutyQual, getDutyQual } from "@/api/experts";
import day from "dayjs";

export default {
  data() {
    // var sysFileRules = (rule, value, callback) => {
    //   if (!this.proImageUrl) {
    //     callback(new Error("请上传附件"));
    //   } else if (!this.professForm.fileId && !this.professForm.sysFilePath) {
    //     callback(new Error("请上传附件"));
    //   } else {
    //     callback();
    //   }
    // };
    var sysFileRules2 = (rule, value, callback) => {
      if (!this.dialogBoolPro) {
        this.statetime = day(this.professForm.startTime).$d;
        this.endtime = day(this.professForm.endTime).$d;
      }
      let bijiao = this.starttime < this.endtime;
      if (!value) {
        return callback(new Error("请选择过期时间"));
      } else if (!bijiao) {
        return callback(new Error("过期时间必须大于注册时间"));
      } else {
        return callback();
      }
    };
    return {
      dialogImageUrl: "", //预览图片
      dialogVisible: false, //预览弹窗
      starttime: "", //校验时间
      endtime: "",
      cardAccept: ".jpg,.png,.jpeg,.bmp",
      rule: {
        registerTime: [
          {
            required: true,
            message: "请输入注册时间",
            trigger: "blur",
          },
        ],
        overTime: [
          {
            required: true,
            validator: sysFileRules2,
            trigger: "blur",
          },
        ],
        dutyQualification: [
          {
            required: true,
            message: "请输入职业资格名称",
            trigger: "blur",
          },
        ],
        certificateNumber: [
          {
            required: true,
            message: "请输入职业资格证书号",
            trigger: "blur",
          },
        ],
        registerUnit: [
          {
            required: true,
            message: "请输入注册单位",
            trigger: "blur",
          },
        ],
        // sysFileFilename: [
        //   {
        //     validator: sysFileRules,
        //     required: true,
        //     trigger: "blur",
        //   },
        // ],
      },
      dialogBoolPro: true, //true 添加  false编辑
      proData: [],
      datas: {
        categoryCode: "duty_qualificate",
      },
      professForm: {},
      setEditor: false,
      labelPosition: "right",
      proImageUrl: "", //添加时的图片
      dialogProVisible: false, // //添加职业资格开关
      editAddIndex: 0, //编辑index
      page: {
        bidMemberId: 0,
        pageNum: 1,
        pageSize: 10,
      },
    };
  },

  created() {
    this.SET_STEP(4);
    this.setEditor = JSON.parse(getEditor());
    this.page.bidMemberId = JSON.parse(getUserE()).userId;
    this.professForm.bidMemberId = JSON.parse(getUserE()).userId;
    getDutyQual(this.page).then((res) => {
      if (res.code === 200) {
        this.proData = res.rows;
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

    //预览图片
    sysFileFunc(row) {
      this.dialogImageUrl =
        row.sysFilePath.indexOf(location.origin) == -1
          ? location.origin + "/api" + row.sysFilePath
          : row.sysFilePath;
      this.dialogVisible = true;
    },

    /**
     * change事件获取事件对象
     * day()库
     */
    changeStart() {
      this.starttime = day(this.professForm.registerTime).$d;
    },
    changeEnd() {
      this.endtime = day(this.professForm.overTime).$d;
    },

    /**
     * 跳转到相关证书
     * 提交一些暂存信息
     */
    pathClick(path, stepIndex) {
      if (this.setEditor) {
        this.SET_STEP(stepIndex);
      }
      if (path === "certificate") {
        let proData = this.proData.map((item) => {
          console.log(item);
          return {
            bidMemberId: item.bidMemberId,
            registerTime: item.registerTime,
            overTime: item.overTime,
            dutyQualification: item.dutyQualification,
            certificateNumber: item.certificateNumber,
            registerUnit: item.registerUnit,
            fileId: item.fileId || +item.sysFileId,
          };
        });
        console.log(proData);
        addDutyQual(proData).then((res) => {
          if (res.code === 200) {
            this.$router.push({
              path: `/exhome/declare/${path}`,
            });
          }
        });
      } else {
        this.$router.push({
          path: `/exhome/declare/${path}`,
        });
      }
    },

    /**
     * 职业资格编辑功能预留接口
     */
    editClick(data, index) {
      this.dialogProVisible = true;
      this.professForm = Object.assign({}, data);
      this.dialogBoolPro = false;
      this.editAddIndex = index;
      this.proImageUrl =
        data.sysFilePath && data.sysFilePath.indexOf(location.origin) == -1
          ? location.origin + "/api" + data.sysFilePath
          : data.sysFilePath;
    },

    /**
     * 职业资格删除功能预留接口
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
          // this.editForm = {};
          this.proData.splice(index, 1);
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
     * 职业资格添加功能预留接口
     */
    proAddClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let sysFilePath = this.proImageUrl;
          let index = null;
          if (!this.dialogBoolPro) {
            index = this.editAddIndex;
          }
          this.utilClick(
            this.professForm,
            this.proData,
            this.dialogBoolPro,
            index,
            sysFilePath
          );
          this.dialogProVisible = false;
          this.professForm.registerTime = "";
          this.professForm.overTime = "";
          this.professForm.certificateNumber = "";
          this.professForm.dutyQualification = "";
          this.professForm.registerUnit = "";
          this.proImageUrl = "";
        }
      });
    },

    /**
     * 添加+编辑保存的工具函数
     */
    utilClick(form, arrForm, type, index, sysFilePath) {
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
     * 点击添加事件
     */
    prpAddClick() {
      this.dialogProVisible = true;
      this.dialogBoolPro = true;
    },

    //上传成功
    handleProSuccess(res, file) {
      this.proImageUrl = location.origin + "/api" + res.data.filePath;
      this.professForm.fileId = res.data.id;
      this.professForm.sysFileFilename = res.data.filename;
    },

    //删除图片
    handleRemove() {
      this.proImageUrl = "";
      this.professForm.sysFileFilename = "";
      this.professForm.sysFilePath = "";
      this.professForm.fileId = "";
      this.professForm.sysFileId = "";
      this.proData.forEach((item, index) => {
        if (this.editAddIndex == index) {
          item.sysFileFilename = "";
          item.sysFilePath = "";
          item.fileId = "";
          item.sysFileId = "";
        }
      });
      console.log(this.proData);
      console.log(this.professForm);
    },

    handleClose() {
      this.dialogProVisible = false;
      this.professForm.registerTime = "";
      this.professForm.overTime = "";
      this.professForm.certificateNumber = "";
      this.professForm.dutyQualification = "";
      this.professForm.registerUnit = "";
      this.proImageUrl = "";
    },

    /**
     * 限制文件上传大小
     */
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png" ||
        file.type === "image/bmp";
      if (!isJPG) {
        this.$message.error("上传图片仅支持 jpg 、jpeg、png、bmp格式！");
      }
      return isJPG;
    },
  },
};
</script>

<style lang="less" scoped>
.professional {
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
        &:nth-of-type(6) {
          .cell {
            cursor: pointer;
            color: #cda059;
          }
        }
        &:nth-of-type(7) {
          .cell {
            display: flex;
            justify-content: center;
          }
        }
      }
    }
  }
  .professional-content {
    flex: 1;

    .infor-pro-add {
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
            .el-form-item {
              .el-form-item__content {
                .el-date-editor {
                  width: 380px;
                  .el-input__inner {
                    width: 380px;
                  }
                }
              }
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