<template>
  <div class="infor-list-norma">
    <el-form
      :model="form"
      ref="form"
      :label-position="labelPosition"
      label-width="120px"
      :rules="rules"
    >
      <div class="infor-message">
        <div class="infor-title">
          <div class="infor-title-all">
            <div class="infor-title-icon"></div>
            <div class="infor-title-title">
              <span>基本信息</span>
            </div>
          </div>
          <div class="infor-title-hr"></div>
        </div>
        <div class="infor-form">
          <el-row>
            <el-col :span="12">
              <el-row>
                <el-form-item label="专家姓名">
                  <div v-text="form.name"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="性别">
                  <div v-text="form.sex === 0 ? '男' : '女'"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="民族">
                  <div v-text="form.nation"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="毕业院校">
                  <div v-text="form.graduateSchool"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="毕业时间">
                  <div v-text="form.graduateTime"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="所学专业">
                  <div v-text="form.major"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="熟练程度">
                  <div v-text="form.proficiency"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="职务职级">
                  <div v-text="form.duty"></div>
                </el-form-item>
              </el-row>
              <!-- <el-row>
                <el-form-item label="统一社会信用代码" class="padding-right">
                  <div v-text="form.creditCode"></div>
                </el-form-item>
              </el-row> -->
              <el-row>
                <el-form-item label="所属行业">
                  <div v-text="form.industryName"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="是否应急专家">
                  <div v-text="form.emergencyExpert"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="联系电话">
                  <div v-text="form.contactPhone"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="银行账号">
                  <div v-text="form.bankAccount"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="注册地区">
                  <div v-text="form.registerArea"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="开户行">
                  <div v-text="form.bank"></div>
                </el-form-item>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-form-item label="出生日期">
                  <div v-text="form.birth"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="身份证号">
                  <div v-text="form.idCard"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="健康状况">
                  <div v-text="form.health"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="学位">
                  <div v-text="form.degree"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="学历">
                  <div v-text="form.education"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="外语语种">
                  <div v-text="form.foreignLanguages"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="工作单位">
                  <div v-text="form.company"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="通讯地址">
                  <div v-text="form.address"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="邮政编码">
                  <div v-text="form.postCode"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="行业工作年限">
                  <div v-text="form.workingYears"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="住宅电话">
                  <div v-text="form.homePhone"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="办公电话">
                  <div v-text="form.officePhone"></div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="现从事工作">
                  <div v-text="form.nowWork"></div>
                </el-form-item>
              </el-row>
            </el-col>
          </el-row>
          <div class="line-hr"></div>
          <el-row>
            <el-col>
              <el-row>
                <el-form-item label="获奖状况">
                  <div v-text="form.awards"></div>
                </el-form-item>
              </el-row>
            </el-col>
            <el-col>
              <el-row>
                <el-form-item label="备注">
                  <div v-text="form.remark"></div>
                </el-form-item>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="inforList-infor-education">
        <div class="infor-title">
          <div class="infor-title-all">
            <div class="infor-title-icon"></div>
            <div class="infor-title-title">
              <span>教育信息</span>
            </div>
          </div>
          <div class="infor-title-hr"></div>
        </div>
        <div class="infor-education">
          <el-table
            :data="form.expertEducationalExperiences"
            style="width: 100%"
            :header-cell-style="headerClass"
            :cell-style="textClass"
          >
            <el-table-column
              prop="startTime"
              label="起始时间"
              width="280"
            ></el-table-column>
            <el-table-column
              prop="endTime"
              label="截止时间"
              width="356"
            ></el-table-column>
            <el-table-column prop="school" label="毕业院校" width="330">
            </el-table-column>
            <el-table-column
              prop="major"
              label="所学专业"
              width="330"
            ></el-table-column>
            <el-table-column prop="degree" label="学位"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="inforList-infor-work">
        <div class="infor-title">
          <div class="infor-title-all">
            <div class="infor-title-icon"></div>
            <div class="infor-title-title">
              <span>工作经历</span>
            </div>
          </div>
          <div class="infor-title-hr"></div>
        </div>
        <div class="infor-work">
          <el-table
            :data="form.expertWorkExperiences"
            style="width: 100%"
            :header-cell-style="headerClass"
            :cell-style="textClass"
          >
            <el-table-column
              prop="startTime"
              label="起始时间"
              width="280"
            ></el-table-column>
            <el-table-column
              prop="endTime"
              label="截止时间"
              width="356"
            ></el-table-column>
            <el-table-column prop="company" label="工作单位" width="330">
            </el-table-column>
            <el-table-column
              prop="job"
              label="从事主要工作"
              width="330"
            ></el-table-column>
            <el-table-column prop="duty" label="担任职务"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="declare-btn">
        <el-row>
          <template v-if="userCode != 200">
            <button
              class="up-btn"
              v-show="setEditor"
              @click.prevent="cancelEditor"
            >
              取消编辑
            </button>
            <button
              class="editor-btn"
              @click.prevent="editorClick"
              v-show="!setEditor"
            >
              编辑
            </button>
          </template>
          <button class="down-btn" @click.prevent="pathClick">下一步</button>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getEditor, setEditor, getUserE, getUserCode } from "@/utils/expauth";
import { getBaseInfo } from "@/api/experts";

export default {
  data() {
    return {
      labelPosition: "left",
      form: {
        bidMemberId: "", //用户信息表ID
        name: "", //姓名
        sex: 0, //性别
        nation: "", //民族
        idCard: "", //身份证号
        graduateSchool: "", //毕业院校
        graduateTime: "", //毕业时间
        major: "", //所学专业
        health: "", //健康状况
        degree: "", //学位
        education: "", //学历
        foreignLanguages: "", //外语语种
        proficiency: "", //熟练程度
        company: "", //工作单位
        creditCode: "", //统一社会信用代码
        duty: "", //职务
        address: "", //通讯地址
        postCode: "", //邮政编码
        industry: "", //所属行业
        workingYears: "", //工作年限
        emergencyExpert: "", //是否应急专家
        homePhone: "", //住宅电话
        contactPhone: "", //联系电话
        officePhone: "", //办公电话
        bank: "", //开户行
        bankAccount: "", //银行账号
        registerArea: "", //注册地区
        awards: "", //获奖情况
        remark: "", //备注
        birth: "", //出生日期
        expertEducationalExperiences: [], //教育经历列表
        expertWorkExperiences: [], //工作经历列表
      },
      rules: {},
      regInfoData: {},
      setEditor: false,
      userCode: 0,
    };
  },

  created() {
    this.userCode = JSON.parse(getUserCode()).code;
    this.regInfoData = JSON.parse(getUserE());
    this.setEditor = JSON.parse(getEditor());
    this.form.name = this.regInfoData.nickName;
    this.form.idCard = this.regInfoData.userName;
    this.form.bidMemberId = this.regInfoData.userId;
    const births = this.form.idCard.substr(6, 8);
    const year = births.substr(0, 4);
    const mouth = births.substr(4, 2);
    const date = births.substr(6, 2);
    this.form.birth = `${year}年${mouth}月${date}日`;

    //获取数据进行回填
    getBaseInfo(this.form.bidMemberId).then((res) => {
      if (res.code === 200 && res.data) {
        this.form = {
          ...res.data,
        };
        console.log(this.form);
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
     * 设置编辑状态
     */
    editorClick() {
      setEditor(JSON.stringify(true));
      this.SET_STEP(1);
      this.$emit("editorFunc", true);
    },

    /**
     * 跳转到评标专业
     * 提交一些暂存信息
     */

    pathClick() {
      if (this.setEditor) {
        //更改导航条index
        this.SET_STEP(2);
      }
      this.$router.push({
        path: `/exhome/declare/evaluation`,
      });
    },
    /**
     * 取消编辑
     */
    cancelEditor() {
      setEditor(JSON.stringify(false));
      this.SET_STEP(5);
      this.$emit("editorFunc", false);
    },
  },
};
</script>


<style lang="less" scoped>
.infor-list-norma {
  /* 头部标题 */

  .el-form {
    .infor-message {
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
          margin: 21px 44px 39px 28px;
        }
      }
      .infor-form {
        margin-left: 44px;
        .padding-right {
          width: 100%;
          /deep/.el-form-item__label {
            padding-right: 52px !important;
          }
        }
        .line-hr {
          width: 1568px;
          height: 1px;
          background: #eee;
          margin: 40px 44px 40px -16px;
        }
      }
    }

    .inforList-infor-education {
      margin-bottom: 55px;
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
          margin: 21px 44px 20px 28px;
        }
      }
      /deep/.el-table {
        width: 1568px !important;
        margin-left: 27px;
        margin-right: 45px;
        .el-table__body-wrapper {
          background-color: #fff;
          .el-table__empty-block {
            min-height: 115px;
            position: relative;
            background-image: url("~@a/expertImg/yj_zjk_kong.png");
            background-repeat: no-repeat;
            background-position: 50% 25px;
            .el-table__empty-text {
              position: absolute;
              bottom: 0;
              color: #bfbfbf;
              font-size: 14px;
              font-family: Microsoft YaHei;
            }
          }
        }
      }
    }

    .inforList-infor-work {
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
          margin: 21px 44px 20px 28px;
        }
      }
      /deep/.el-table {
        width: 1568px !important;
        background: #f8f8f8;
        margin-left: 27px;
        margin-right: 45px;
        &::before {
          height: 0;
        }
        .el-table__body-wrapper {
          background-color: #fff;
          .el-table__empty-block {
            min-height: 115px;
            position: relative;
            background-image: url("~@a/expertImg/yj_zjk_kong.png");
            background-repeat: no-repeat;
            background-position: 50% 25px;
            .el-table__empty-text {
              position: absolute;
              bottom: 0;
              color: #bfbfbf;
              font-size: 14px;
              font-family: Microsoft YaHei;
            }
          }
        }
      }
    }
  }
}
</style>
