<template>
  <div class="cert-norma">
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
      <el-form ref="form" :model="form" label-position="right">
        <el-form-item
          v-for="(item, index) in form.fileCategories"
          :label="item.name"
          label-width="125px"
          :key="index"
        >
          <el-row>
            <div class="certificate-img">
              <viewer  :images="item.files">
                <img
                  v-for="(cell, idx) in item.files"
                  :key="idx"
                  :alt="item.name"
                  :src="location.origin + '/api' + cell.path"
                />
              </viewer>
            </div>
          </el-row>
          <el-row>
            <div class="certificate-text">
              <span>（支持 jpg 、jpeg、png、bmp格式，大小不超过10M）</span>
            </div>
          </el-row>
        </el-form-item>

        <!-- <el-form-item
          :rules="[
            {
              required: true
            }
          ]"
          label="所在单位意见"
          label-width="125px"
        >
          <el-row>
            <div class="certificate-img img-bg">
              <img src="@a/expertImg/yj_zjk_dwyj.png" alt="" />
            </div>
          </el-row>
          <el-row>
            <div class="certificate-text">
              <span>（支持 jpg 、jpge、png、bmp格式，大小不超过10M）</span>
            </div>
          </el-row>
        </el-form-item>
        <el-form-item label="两院院士电子件" label-width="125px">
          <el-row>
            <div class="certificate-img">
              <img src="@a/expertImg/yj_zjk_dzj.png" alt="" />
            </div>
          </el-row>
          <el-row>
            <div class="certificate-text">
              <span>（支持 jpg 、jpge、png、bmp格式，大小不超过10M）</span>
            </div>
          </el-row>
        </el-form-item>
        <el-form-item
          label="个人照片"
          label-width="125px"
          :rules="[
            {
              required: true
            }
          ]"
        >
          <el-row>
            <div class="certificate-img img-bg">
              <img src="@a/expertImg/yj_zjk_zp.png" alt="" />
            </div>
          </el-row>
          <el-row>
            <div class="certificate-text">
              <span>（支持 jpg 、jpge、png、bmp格式，大小不超过10M）</span>
            </div>
          </el-row>
        </el-form-item>
        <el-form-item
          label="身份证"
          label-width="125px"
          :rules="[
            {
              required: true
            }
          ]"
        >
          <el-row>
            <div class="certificate-img-sfz">
              <div class="certificate-sfz">
                <div class="sfz">
                  <img src="@a/expertImg/yj_zjk_sfz_01.png" alt="" />
                </div>
                <div class="sfz-text">
                  <span>身份证正面</span>
                </div>
              </div>
              <div class="certificate-sfz">
                <div class="sfz">
                  <img src="@a/expertImg/yj_zjk_sfz_02.png" alt="" />
                </div>
                <div class="sfz-text">
                  <span>身份证反面</span>
                </div>
              </div>
            </div>
          </el-row>
        </el-form-item>
        <el-form-item
          label="承诺书"
          label-width="125px"
          :rules="[
            {
              required: true
            }
          ]"
        >
          <el-row>
            <div class="certificate-img img-bg">
              <img src="@a/expertImg/yj_zjk_dwyj.png" alt="" />
            </div>
          </el-row>
          <el-row>
            <div class="certificate-text">
              <span>（支持 jpg 、jpge、png、bmp格式，大小不超过10M）</span>
            </div>
          </el-row>
        </el-form-item>
        -->
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
import { getCertificateList } from "@/api/experts";

export default {
  data() {
    return {
      setEditor: false,
      bid: {
        bidMemberId: 0,
      },
      form: {
        fileCategories: [],
      },
      location,
    };
  },

  created() {
    this.setEditor = JSON.parse(getEditor());
    this.bid.bidMemberId = JSON.parse(getUserE()).userId;
    getCertificateList(this.bid).then((res) => {
      if (res.code === 200) {
        this.form.fileCategories = res.data.fileCategories;
      }
    });
  },

  methods: {
    ...mapActions("page", ["SET_STEP"]),

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
.cert-norma {
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
  .certificate-content {
    margin-left: 20px;
    .el-form {
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
          // width: 184px;
          // height: 133px;
          div {
            cursor: pointer;
            > img {
              width: 184px;
              height: 133px;
              &:nth-of-type(2) {
                margin-left: 29px;
              }
              &:nth-of-type(3) {
                margin-left: 29px;
              }
            }
            &.img-bg {
              width: 184px;
              height: 133px;
              background: #f8f8f8;
              border: 1px solid #eeeeee;
              border-radius: 4px;

              > img {
                margin: 0 auto;
                width: 94px;
                height: 131px;
              }
            }
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
