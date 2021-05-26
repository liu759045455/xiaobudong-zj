<template>
  <div class="cert-editor">
    <div class="infor-title">
      <div class="infor-title-all">
        <div class="infor-title-icon"></div>
        <div class="infor-title-title">
          <span>相关证书</span>
        </div>
      </div>
      <div class="infor-title-hr"></div>
    </div>
    <div class="certificate-content">
      <el-form ref="form" :model="form" label-position="right" :rules="rules">
        <el-form-item
          v-for="(item, index) in form.fileCategories"
          :key="index"
          :label="item.name"
          label-width="125px"
          :class="[{ card: item.code === 'identity_card' }]"
          :prop="item.code"
        >
          <el-row>
            <div class="certificate-img">
              <!-- 其他材料上传 -->
              <upload
                v-if="
                  item.code !== 'identity_card' &&
                  item.code !== 'education_degree'
                "
                :code="item.code"
                :value.sync="img"
                :list="item.files[0]"
                :imgUrl="imgUrl"
                :accept="cardAccept"
                @returnId="returnId"
                @deleteId="deleteId"
                :text="licenseText"
              ></upload>
              <!-- 身份证上传 -->
              <upload
                v-if="item.code === 'identity_card'"
                :code="item.code"
                :value.sync="imgCardFront"
                :list="item.files[0]"
                :imgUrl="imgUrl"
                :accept="cardAccept"
                :explain="cardExplainF"
                @returnId="returnId"
                @deleteId="deleteId"
              ></upload>
              <upload
                v-if="item.code === 'identity_card'"
                :code="item.code"
                :value.sync="imgCardBack"
                :list="item.files[1]"
                :imgUrl="imgUrl"
                :accept="cardAccept"
                :explain="cardExplainB"
                @returnId="returnId"
                @deleteId="deleteId"
              ></upload>
              <!-- 学历、学位材料 -->
              <uploadMore
                v-if="item.code === 'education_degree'"
                :code="item.code"
                :value.sync="img"
                :imgUrl="imgUrl"
                :list="item.files"
                :accept="cardAccept"
                @returnId="returnId"
                @deleteId="deleteId"
                :text="licenseText"
              >
              </uploadMore>
            </div>
          </el-row>
        </el-form-item>
      </el-form>
    </div>
    <div class="declare-btn">
      <el-row>
        <button class="up-btn" @click.prevent="pathClick('professional', 4)">
          上一步
        </button>
        <button
          class="submit-btn"
          @click="submitForm('form')"
          v-show="setEditor && $store.state.page.stepIndex === 5"
        >
          提交
        </button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getEditor, getUserE } from "@/utils/expauth";
import { addRelevantCertificates, getQueryDegree } from "@/api/experts";
import { getCertificateList } from "@/api/experts";
import upload from "@/components/uploadImage/index.vue";
import uploadMore from "@/components/uploadImage/uploadMore.vue";
export default {
  data() {
    return {
      form: {
        fileCategories: null,
      },
      rules: {
        // unit_opinion: [
        //   {
        //     validator: this.verify,
        //     required: true,
        //   },
        // ],
        // commit_letter: [
        //   {
        //     required: true,
        //     validator: this.verify,
        //   },
        // ],
        identity_card: [
          {
            required: true,
            validator: this.verify,
          },
        ],
        // personal_photos: [
        //   {
        //     required: true,
        //     validator: this.verify,
        //   },
        // ],
      },
      filres: {},
      setEditor: false,
      certData: {
        bidMemberId: 0,
        fileIds: [],
      },
      bid: {
        bidMemberId: 0,
      },
      EditData: [],
      cardAccept: ".jpg,.png,.jpeg,.bmp",
      imgUrl: "/api/file/upload/common",
      img: require("@/assets/icon/yj_icon_sc.png"),
      imgCardFront: require("@/assets/icon/yj_icon_sfz.png"),
      imgCardBack: require("@/assets/icon/yj_icon_sfz2.png"),
      cardExplainF: "身份证正面",
      cardExplainB: "身份证反面",
      licenseText: "（支持 jpg 、jpeg、png、bmp格式，大小不超过10M）",
    };
  },
  components: {
    upload,
    uploadMore,
  },
  created() {
    this.setEditor = JSON.parse(getEditor());
    this.certData.bidMemberId = JSON.parse(getUserE()).userId;
    this.bid.bidMemberId = JSON.parse(getUserE()).userId;
    getCertificateList(this.bid).then((res) => {
      if (res.code === 200) {
        this.form.fileCategories = res.data.fileCategories;
      }
    });
  },
  methods: {
    ...mapActions("page", ["SET_STEP"]),
    verify(rule, value, callback) {
      let type = rule.field;
      let length = type === "identity_card" ? 2 : 1;
      this.form.fileCategories.forEach((item) => {
        if (item.code === type) {
          if (item.files.length < length) {
            callback(new Error(`请选择${item.name}`));
          } else {
            callback();
          }
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.form.fileCategories.forEach((item) => {
            item.files.forEach((cell) => {
              this.certData.fileIds.push(cell.id);
            });
          });
          addRelevantCertificates(this.certData).then((res) => {
            if (res.code === 200) {
              getQueryDegree(this.bid.bidMemberId).then((res) => {
                if (res.code === 200) {
                  if (res.data.auditStatus == 0 || res.data.auditStatus == 1) {
                    // 0未审核, 1待审核
                    this.$router.push({
                      path: "/exhome/waiting",
                    });
                  }
                }
              });
            }
          });
        }
      });
    },
    /** 返回文件id */
    returnId(result) {
      this.form.fileCategories.forEach((item) => {
        if (item.code.indexOf(result.code) !== -1) {
          if (
            item.code === "identity_card" ||
            item.code === "education_degree"
          ) {
            item.files.push(result.result);
          } else {
            item.files = [result.result];
          }
        }
      });
    },
    /** 删除文件 id */
    deleteId(result) {
      let idx = null;
      this.form.fileCategories.forEach((item) => {
        if (item.code.indexOf(result.code) !== -1) {
          if (typeof result.result !== "object") {
            item.files.splice(result, 1);
            return;
          }
          if (item.code === "identity_card") {
            item.files.forEach((cell, index) => {
              if (cell.id === result.id) {
                idx = index;
              }
            });
            item.files.splice(idx, 1);
          } else {
            item.files = [];
          }
        }
      });
    },
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
.cert-editor {
  .infor-title {
    .infor-title-all {
      display: flex;
      margin-top: 31px;
      margin-left: 30px;
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
      width: 1568px;
      height: 1px;
      background: #eee;
      margin: 21px 44px 54px 28px;
    }
  }
  /deep/.el-form {
    .el-form-item {
      margin-bottom: 40px;
      .el-row {
        &:nth-of-type(2) {
          margin-top: 16px;
        }
      }
      //
      .certificate-img {
        display: flex;
        .avatar-uploader {
          .el-upload {
            overflow: visible !important;
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
          position: relative;
          width: 184px;
          height: 133px;
          background-color: #fff;
          border: none;
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
        &.img-bg {
          width: 184px;
          height: 133px;
          .avatar-uploader {
            width: 100%;
            height: 100%;
            .el-upload {
              width: 100%;
              height: 100%;
              .imgages {
                border-radius: 6px;
                background: #f8f8f8;
              }

              .avatar {
                //图片
                width: 94px;
                height: 131px;
                margin: 0 auto;
                display: block;
              }
            }
          }
        }
        .avatar-uploader .el-upload {
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
        }
      }
      .certificate-img-sfz {
        display: flex;
        .certificate-sfz {
          .sfz {
            width: 183px;
            height: 114px;
            margin-right: 100px;
            > img {
              width: 100%;
              height: 100%;
            }
            .el-upload {
              overflow: visible !important;
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
            }

            .avatar-uploader .el-upload {
              // border: 1px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
            }

            .uploader-icon {
              display: block;
              background: url("~@a/expertImg/yj_icon_sfz.png") no-repeat center;
              width: 185px;
              height: 126px;
              line-height: 126px;
              text-align: center;
              &.fm-uploader-icon {
                background: url("~@a/expertImg/yj_icon_sfz2.png") no-repeat
                  center;
              }
            }
            .avatar {
              width: 185px;
              height: 126px;
              display: block;
            }
          }
          .sfz-text {
            display: inline-block;
            width: 183px;
            margin-top: 16px;
            text-align: center;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #666666;
          }
        }
      }
      .certificate-text {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
      }
    }
    .card {
      .component-upload-image {
        display: flex;
        flex-direction: column;
        &:nth-of-type(2) {
          margin-left: 100px;
        }
      }
    }
  }
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
</style>
