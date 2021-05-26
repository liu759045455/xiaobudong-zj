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
                <el-form-item label="性别" prop="sex">
                  <el-radio v-model="form.sex" :label="0">男</el-radio>
                  <el-radio v-model="form.sex" :label="1">女</el-radio>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="民族" prop="nation">
                  <el-select v-model="form.nation" placeholder="请选择">
                    <el-option
                      v-for="item in optionsNa"
                      :key="item.id"
                      :label="item.name"
                      :value="item.name"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="毕业院校" prop="graduateSchool">
                  <el-input
                    v-model.trim="form.graduateSchool"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="毕业时间">
                  <el-date-picker
                    v-model="form.graduateTime"
                    type="month"
                    placeholder="请选择"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="所学专业" prop="major">
                  <div class="block">
                    <el-input
                      v-model.trim="form.major"
                      placeholder="请输入"
                      :maxlength="50"
                    ></el-input>
                  </div>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="熟练程度" prop="proficiency">
                  <el-select v-model="form.proficiency" placeholder="请选择">
                    <el-option
                      v-for="item in optionsPro"
                      :key="item.dictCode"
                      :label="item.dictLabel"
                      :value="item.dictLabel"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="职务(职级)" prop="duty">
                  <el-input
                    v-model.trim="form.duty"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
              <!-- <el-row>
                <el-form-item
                  prop="creditCode"
                  label="统一社会信用代码"
                  class="padding-right"
                >
                  <el-input
                    v-model.trim="form.creditCode"
                    placeholder="请输入"
                    :maxlength="18"
                  ></el-input>
                </el-form-item>
              </el-row> -->
              <el-row>
                <el-form-item label="所属行业" prop="industry">
                  <!-- <el-select v-model="form.industry" placeholder="请选择">
                    <el-option
                      v-for="item in optionsTr"
                      :key="item.dictCode"
                      :label="item.dictLabel"
                      :value="item.dictLabel"
                    >
                    </el-option>
                    
                  </el-select> -->
                  <el-cascader
                    v-model="form.industry"
                    :options="optionsTr"
                    clearable
                  ></el-cascader>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="是否应急专家" prop="emergencyExpert">
                  <el-select
                    v-model="form.emergencyExpert"
                    placeholder="请选择"
                  >
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
                <el-form-item label="联系电话" prop="contactPhone">
                  <el-input
                    v-model.trim="form.contactPhone"
                    placeholder="请输入"
                    :maxlength="11"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="银行账号" prop="bankAccount">
                  <el-input
                    v-model.trim="form.bankAccount"
                    placeholder="请输入"
                    :maxlength="21"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="开户行" prop="bank">
                  <el-input
                    v-model.trim="form.bank"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>

              <el-row>
                <el-form-item label="注册地区" prop="registerArea">
                  <el-input
                    v-model.trim="form.registerArea"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
              <!-- <el-row>
                <el-form-item label="现从事工作">
                  <el-input
                    v-model.trim="form.nowWork"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row> -->
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
                <el-form-item label="健康状况" prop="health">
                  <el-select v-model="form.health" placeholder="请选择">
                    <el-option
                      v-for="item in optionsHe"
                      :key="item.dictCode"
                      :label="item.dictLabel"
                      :value="item.dictLabel"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="学位" prop="degree">
                  <el-input
                    v-model.trim="form.degree"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="学历" prop="education">
                  <el-input
                    v-model.trim="form.education"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="外语语种" prop="foreignLanguages">
                  <el-input
                    v-model.trim="form.foreignLanguages"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="工作单位" prop="company">
                  <el-input
                    v-model.trim="form.company"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="通讯地址">
                  <el-input
                    v-model.trim="form.address"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="邮政编码">
                  <el-input
                    v-model.trim="form.postCode"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="行业工作年限" prop="workingYears">
                  <el-input
                    v-model.trim="form.workingYears"
                    placeholder="请输入"
                    :maxlength="5"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="住宅电话">
                  <el-input
                    v-model.trim="form.homePhone"
                    placeholder="请输入"
                    :maxlength="20"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="办公电话">
                  <el-input
                    v-model.trim="form.officePhone"
                    placeholder="请输入"
                    :maxlength="20"
                  ></el-input>
                </el-form-item>
              </el-row>
              
              <el-row>
                <el-form-item label="现从事工作">
                  <el-input
                    v-model.trim="form.nowWork"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
            </el-col>
          </el-row>
          <div class="line-hr"></div>
          <el-row>
            <el-col>
              <el-row>
                <el-form-item label="获奖状况">
                  <el-input
                    type="textarea"
                    placeholder="请输入"
                    v-model="form.awards"
                    maxlength="300"
                    show-word-limit
                    resize="none"
                  >
                  </el-input>
                </el-form-item>
              </el-row>
            </el-col>
            <el-col>
              <el-row>
                <el-form-item label="备注">
                  <el-input
                    type="textarea"
                    placeholder="请输入"
                    v-model="form.remark"
                    maxlength="300"
                    show-word-limit
                    resize="none"
                  >
                  </el-input>
                </el-form-item>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
      <!-- jiaoyuxinix -->
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
          <div class="infor-education-add" @click="eduAddClick">添加</div>
          <el-dialog
            :title="dialogBoolEdu ? '添加教育信息' : '编辑教育信息'"
            :visible.sync="dialogVisible"
            width="700"
            :before-close="handleEduClose"
          >
            <el-form
              :model="eduForm"
              ref="eduForm"
              :label-position="labelPosition"
              label-width="120px"
              :rules="addEduEx"
            >
              <el-row>
                <el-form-item label="起始时间" prop="startTime">
                  <el-date-picker
                    v-model="eduForm.startTime"
                    type="month"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM"
                    placeholder="请选择"
                    @change="changeEduStart"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="截止时间" prop="endTime">
                  <el-date-picker
                    v-model="eduForm.endTime"
                    type="month"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM"
                    placeholder="请选择"
                    @change="changeEduEnd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="毕业院校" prop="school">
                  <el-input
                    v-model.trim="eduForm.school"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="所学专业" prop="major">
                  <el-input
                    v-model.trim="eduForm.major"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="学位" prop="degree">
                  <el-input
                    v-model.trim="eduForm.degree"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
            </el-form>
            <!-- <div slot="footer" class="dialog-footer"> -->
            <div class="dialog-foote">
              <div class="edu-btn-add" @click="educationAddClick('eduForm')">
                {{ dialogBoolEdu ? "添加" : "保存" }}
              </div>
            </div>

            <!-- <el-button type="primary" @click="dialogVisible = false"
                >确 定</el-button
              > -->
            <!-- </div> -->
          </el-dialog>
          <el-table
            :data="form.expertEducationalExperiences"
            style="width: 100%"
            :header-cell-style="headerClass"
            :cell-style="textClass"
          >
            <el-table-column
              prop="startTime"
              label="起始时间"
              width="192"
            ></el-table-column>
            <el-table-column
              prop="endTime"
              label="截止时间"
              width="308"
            ></el-table-column>
            <el-table-column prop="school" label="毕业院校" width="300">
            </el-table-column>
            <el-table-column
              prop="major"
              label="所学专业"
              width="330"
            ></el-table-column>
            <el-table-column
              prop="degree"
              label="学位"
              width="200"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div
                  class="oper-btn oper-edit"
                  @click="editClick(scope.row, scope.$index)"
                >
                  <div class="edit-icon">
                    <img src="~@a/expertImg/yj_zjk_bj.png" alt="" />
                  </div>
                  <div class="oper-text">编辑</div>
                </div>
                <div class="oper-btn" @click="eduRemoveClick(scope.$index)">
                  <div class="oper-icon">
                    <img src="~@a/expertImg/yj_zjk_sc.png" alt="" />
                  </div>
                  <div class="oper-text">
                    <span>删除</span>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 工作经历 -->
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
          <div class="infor-work-add" @click="workAddInforClick">添加</div>
          <el-dialog
            :title="dialogBoolEdu ? '添加工作经历' : '编辑工作经历'"
            :visible.sync="workVisible"
            width="700"
            :before-close="handleClose"
          >
            <el-form
              :model="experForm"
              ref="experForm"
              :label-position="labelPosition"
              label-width="120px"
              :rules="addExperEx"
            >
              <el-row>
                <el-form-item label="起始时间" prop="startTime">
                  <el-date-picker
                    v-model="experForm.startTime"
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
                <el-form-item label="截止时间" prop="endTime">
                  <el-date-picker
                    v-model="experForm.endTime"
                    type="month"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    format="yyyy-MM"
                    placeholder="请选择"
                    @change="changeEnd"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="工作单位" prop="company">
                  <el-input
                    v-model.trim="experForm.company"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="主要工作" prop="job">
                  <el-input
                    v-model.trim="experForm.job"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="担任职务" prop="duty">
                  <el-input
                    v-model.trim="experForm.duty"
                    placeholder="请输入"
                    :maxlength="50"
                  ></el-input>
                </el-form-item>
              </el-row>
            </el-form>
            <div class="dialog-foote">
              <div class="edu-btn-add" @click="workAddClick('experForm')">
                {{ dialogBoolWork ? "添加" : "保存" }}
              </div>
            </div>
          </el-dialog>
          <el-table
            :data="form.expertWorkExperiences"
            style="width: 100%"
            :header-cell-style="headerClass"
            :cell-style="textClass"
          >
            <el-table-column
              prop="startTime"
              label="起始时间"
              width="192"
            ></el-table-column>
            <el-table-column
              prop="endTime"
              label="截止时间"
              width="308"
            ></el-table-column>
            <el-table-column prop="company" label="工作单位" width="300">
            </el-table-column>
            <el-table-column
              prop="job"
              label="从事主要工作"
              width="330"
            ></el-table-column>
            <el-table-column
              prop="duty"
              label="担任职务"
              width="200"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div
                  class="oper-btn oper-edit"
                  @click="editWorkClick(scope.row, scope.$index)"
                >
                  <div class="edit-icon">
                    <img src="~@a/expertImg/yj_zjk_bj.png" alt="" />
                  </div>
                  <div class="oper-text">
                    <span>编辑</span>
                  </div>
                </div>
                <div class="oper-btn">
                  <div class="oper-icon">
                    <img src="~@a/expertImg/yj_zjk_sc.png" alt="" />
                  </div>
                  <div class="oper-text" @click="workRemoveClick(scope.$index)">
                    <span>删除</span>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="declare-btn">
        <el-row>
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
          <button class="down-btn" @click.prevent="pathClick">下一步</button>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { addBasicExpert, getProfessional, getBaseInfo } from "@/api/experts";
import { basicEx } from "../declareInfo/valida";
import { getDicts, getDictsList } from "@/api/index";
import { getEditor, setEditor, getUserE } from "@/utils/expauth";
import day from "dayjs";

export default {
  data() {
    var sysFileRules = (rule, value, callback) => {
      let bijiao = this.statetime < this.endtime;
      if (!value) {
        return callback(new Error("请选择截止时间时间"));
      } else if (!bijiao) {
        return callback(new Error("结束时间必须大于开始时间"));
      } else {
        return callback();
      }
    };
    var sysFileRules2 = (rule, value, callback) => {
      let bijiao = this.statetime < this.endtime;
      if (!value) {
        return callback(new Error("请选择截止时间时间"));
      } else if (!bijiao) {
        return callback(new Error("起始时间必须大于开始时间"));
      } else {
        return callback();
      }
    };
    return {
      labelPosition: "rigth",
      dialogBoolEdu: true, //true 添加  false编辑
      dialogBoolWork: true, //true 添加  false编辑
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
        expertEducationalExperiences: [], //教育信息数组
        expertWorkExperiences: [], //工作经历数组
      },
      regInfoData: {},
      dialogVisible: false, //教育添加开关
      workVisible: false, //工作经历开关
      rules: basicEx,
      optionsNa: [], //民族
      optionsHe: [], //健康状况
      dicType: "health,proficiency_type,trade_type",
      editIndexEdu: -1,
      optionsEm: [
        {
          id: 0,
          value: "是",
        },
        {
          id: 1,
          value: "否",
        },
      ],
      // proType: 'proficiency_type',
      optionsPro: [], //熟练程度
      // tradeType: 'trade_type'
      optionsTr: [], //所属行业
      optionsProfess: [], //所学专业
      setEditor: true,
      stepIndex: 1,
      experForm: {
        //添加时的工作经历数据
        startTime: "", //校验时间
        endTime: "",
        company: "", //工作单位
        job: "", //主要工作
        duty: "", //担任职务
      },
      editExperForm: {
        //编辑时的工作经历数据
        startTime: "",
        endTime: "",
        company: "", //工作单位
        job: "", //主要工作
        duty: "", //担任职务
      },
      eduForm: {
        //添加时的教育数据
        startTime: "", //开始时间
        endTime: "", //截止时间
        school: "", //毕业院校
        major: "", //专业
        degree: "", //学位
      },
      editEduForm: {
        //编辑时的教育数据
        startTime: "", //开始时间
        endTime: "", //截止时间
        school: "", //毕业院校
        major: "", //专业
        degree: "", //学位
      },
      statetime: "",
      endtime: "",
      addEduEx: {
        startTime: [
          {
            required: true,
            message: "请选择起始时间",
            trigger: "blur",
          },
        ],
        endTime: [
          {
            validator: sysFileRules2,
            required: true,
            trigger: "blur",
          },
        ],
        school: [
          {
            required: true,
            message: "请输入毕业院校",
            trigger: "blur",
          },
        ],
        major: [
          {
            required: true,
            message: "请输入所学专业",
            trigger: "blur",
          },
        ],
        degree: [
          {
            required: true,
            message: "请输入学位",
            trigger: "blur",
          },
        ],
      }, //教育验证
      addExperEx: {
        startTime: [
          {
            required: true,
            message: "请选择起始时间",
            trigger: "blur",
          },
        ],
        endTime: [
          {
            validator: sysFileRules,
            required: true,
            // message: "请选择截止时间时间",
            trigger: "blur",
          },
        ],
        company: [
          {
            required: true,
            message: "请输入工作单位",
            trigger: "blur",
          },
        ],
        job: [
          {
            required: true,
            message: "请输入主要工作",
            trigger: "blur",
          },
        ],
        duty: [
          {
            required: true,
            message: "请输入担任职务",
            trigger: "blur",
          },
        ],
      }, //工作经历验证
      // editIndex: 0, //编辑教育的index
      editWorkIndex: 0, //编辑添加的index
    };
  },
  created() {
    this.SET_STEP(1);
    this.setEditor = JSON.parse(getEditor());
    // this.setStepIndex = JSON.parse(getStepIndex());
    this.regInfoData = JSON.parse(getUserE());
    this.form.name = this.regInfoData.nickName;
    this.form.idCard = this.regInfoData.userName;
    this.form.bidMemberId = this.regInfoData.userId;
    const births = this.form.idCard.substr(6, 8);
    const year = births.substr(0, 4);
    const mouth = births.substr(4, 2);
    const date = births.substr(6, 2);
    this.form.birth = `${year}年${mouth}月${date}日`;
    this.optionsNa = this.constant.nation_common_type; //民族

    //字典查询
    getDicts(this.dicType).then((res) => {
      this.optionsHe = res.data.health; //健康状况
      this.optionsPro = res.data.proficiency_type; //熟练程度
    });
    //所属行业
    getDictsList("expert_industry_type").then((res) => {
      if (res.code == 200) {
        this.optionsTr = res.data;
      }
    });
    ////所学专业
    getProfessional().then((res) => {
      console.log(res);
      this.optionsProfess = res.data;
    });

    //获取数据进行回填
    getBaseInfo(this.form.bidMemberId).then((res) => {
      console.log(res);
      if (res.code === 200 && res.data) {
        this.form = {
          ...res.data,
        };
        if (!this.form.expertEducationalExperiences) {
          this.form.expertEducationalExperiences = [];
        }
        if (!this.form.expertWorkExperiences) {
          this.form.expertWorkExperiences = [];
        }
        this.form.sex = this.form.sex == 0 ? 0 : 1;
        this.form.industry = this.form.industryList
        ? JSON.parse(this.form.industryList)
        : this.form.industry;
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
     * change事件获取事件对象
     * day()库
     */
    changeStart() {
      this.statetime = day(this.experForm.startTime).$d;
    },
    changeEnd() {
      this.endtime = day(this.experForm.endTime).$d;
    },

    changeEduStart() {
      this.statetime = day(this.eduForm.startTime).$d;
    },
    changeEduEnd() {
      this.endtime = day(this.eduForm.endTime).$d;
    },

    /**
     * 跳转到技术职称
     * 提交一些暂存信息
     */

    /**
     * 设置编辑状态
     */
    editorClick() {
      this.SET_STEP(1);
      // this.SET_Editor(true);
      setEditor(JSON.stringify(true));
      // setStepIndex(JSON.stringify(1));
      this.$emit("editorFunc", true);
    },

    /**
     * 跳转到评标专业
     * 提交一些暂存信息
     */

    pathClick() {
      console.log(this.form.industry);
      this.form.industryList = JSON.stringify(this.form.industry);
      this.form.industry = this.form.industry instanceof Array ? this.form.industry[this.form.industry.length - 1]
        : this.form.industry;  
       console.log(this.form);  
      addBasicExpert(this.form).then((res) => {
        if (res.code === 200) {
          if (this.setEditor) {
            //更改导航条index
            this.SET_STEP(2);
          }
          this.$router.push({
            path: `/exhome/declare/evaluation`,
          });
        }
      });
    },

    /**
     * 取消编辑
     */
    cancelEditor() {
      setEditor(JSON.stringify(false));
      // setStepIndex(JSON.stringify(5));
      this.$emit("editorFunc", false);
      this.SET_STEP(5);
      //跳转基本信息
      this.$router.push({
        path: `/exhome/declare/inforList`,
      });
    },

    /**
     * 预留教育信息添加事件
     */
    educationAddClick(formName) {
      // debugger;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // debugger;
          let index = null;
          if (!this.dialogBoolEdu) {
            index = this.editIndexEdu;
          }
          this.utilClick(
            this.eduForm,
            this.form.expertEducationalExperiences,
            this.dialogBoolEdu,
            index
          );
          this.eduForm.endTime = "";
          this.eduForm.startTime = "";
          this.eduForm.school = "";
          this.eduForm.major = "";
          this.eduForm.degree = "";
          this.dialogVisible = false;
        }
      });
    },

    /**
     * 添加+编辑保存的工具函数
     */
    utilClick(form, arrForm, type, index) {
      if (type) {
        arrForm.push({
          ...form,
        });
      } else {
        this.$set(arrForm, index, {
          ...form,
        });
      }
    },
    /**
     * 编辑教育点击事件
     */
    editClick(data, index) {
      this.editIndexEdu = index;
      this.eduForm = Object.assign({}, data);
      this.dialogText = "编辑教育信息";
      this.dialogVisible = true;
      this.dialogBoolEdu = false;
    },

    /**
     * 编辑教育添加点击事件
     */
    eduAddClick() {
      this.dialogVisible = true;
      this.dialogBoolEdu = true;
    },

    /**
     * 编辑教育保存事件
     */
    eduCopyClick() {
      this.utilClick(
        this.editEduForm,
        this.form.expertEducationalExperiences,
        "cover",
        this.editIndex
      );
    },

    /**
     * 预留工作经历添加事件
     */
    workAddClick(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let index = null;
          if (!this.dialogBoolWork) {
            index = this.editWorkIndex;
          }
          this.utilClick(
            this.experForm,
            this.form.expertWorkExperiences,
            this.dialogBoolWork,
            index
          );
          this.experForm.startTime = "";
          this.experForm.endTime = "";
          this.experForm.company = "";
          this.experForm.job = "";
          this.experForm.duty = "";
          this.workVisible = false;
        }
      });
    },

    /**
     * 工作经历添加点击事件
     */
    workAddInforClick() {
      this.workVisible = true;
      this.dialogBoolWork = true;
    },

    /**
     * 编辑工作经历保存事件
     */
    workCopyClick() {
      this.utilClick(
        this.editExperForm,
        this.form.expertWorkExperiences,
        "cover",
        this.editWorkIndex
      );
      this.workVisible = false;
    },

    /**
     * 编辑工作经历弹出框打开事件
     *
     *  */
    openWork() {
      let editData = this.form.expertWorkExperiences[this.editWorkIndex];
      this.editExperForm.endTime = editData.oldETime;
      this.editExperForm.startTime = editData.oldSTime;
      this.editExperForm.company = editData.company;
      this.editExperForm.job = editData.job;
      this.editExperForm.duty = editData.duty;
    },

    /**
     * 编辑工作经历点击事件
     * 获取index 并且打开编辑弹窗
     */
    editWorkClick(data, index) {
      this.dialogBoolWork = false;
      this.experForm = Object.assign({}, data);

      this.workVisible = true;
      this.editWorkIndex = index;
    },

    /**
     * 教育信息删除功能预留接口
     */
    eduRemoveClick(index) {
      this.$confirm("是否确认删除该条记录?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        customClass: "message-box",
        type: "warning",
      })
        .then(() => {
          this.editEduForm = [];
          this.form.expertEducationalExperiences.splice(index, 1);
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
     * 工作经历删除功能预留接口
     */
    workRemoveClick(index) {
      this.$confirm("是否确认删除该条记录?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        customClass: "message-box",
        type: "warning",
      })
        .then(() => {
          this.editExperForm = [];
          this.form.expertWorkExperiences.splice(index, 1);
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

    handleEduClose() {
      this.dialogVisible = false;
      this.$refs["eduForm"].resetFields();
      this.eduForm.startTime = "";
      this.eduForm.endTime = "";
      this.eduForm.school = "";
      this.eduForm.major = "";
      this.eduForm.degree = "";
    },
    /** 工作经历 */
    handleClose() {
      this.workVisible = false;
      this.$refs["experForm"].resetFields();
      //添加时的工作经历数据
      this.experForm.startTime = "";
      this.experForm.endTime = "";
      this.experForm.company = "";
      this.experForm.job = "";
      this.experForm.duty = "";
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
            width: 80px !important;
            position: absolute;
            left: 38px;
            line-height: 20px;
          }
        }
        /deep/.el-row {
          .el-form-item {
            .el-form-item__content {
              .el-input {
                .el-input__inner {
                  width: 320px;
                  height: 40px;
                  border-radius: 4px;
                }
              }
              .el-date-editor {
                width: 320px;
              }
              .el-textarea {
                width: 956px;
                height: 140px;
                .el-input__count {
                  right: 30px;
                }
                .el-textarea__inner {
                  width: 956px;
                  height: 140px;
                  border: 1px solid #eeeeee;
                  border-radius: 4px;
                }
              }
              .el-radio {
                .el-radio__label {
                  color: #333333;
                }
                .el-radio__input {
                  &.is-checked {
                    .el-radio__inner {
                      border-color: #cda059;
                      background: #cda059;
                    }
                  }
                }
              }
            }
          }
        }
        .line-hr {
          width: 1568px;
          height: 1px;
          background: #eee;
          margin: 20px 44px 40px -16px;
        }
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

      .infor-education {
        .infor-education-add {
          margin-left: 27px;
          margin-bottom: 17px;
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
        /deep/.el-dialog__wrapper {
          .el-dialog {
            width: 700px;
            .el-dialog__body {
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
      }

      /deep/.el-table {
        width: 1568px !important;
        margin-left: 27px;
        margin-right: 45px;
        &::before {
          height: 0;
        }
        .el-table__row {
          .cell {
            display: flex;
            justify-content: center;
          }
        }

        .el-table__body-wrapper {
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

      .infor-work-add {
        margin-left: 27px;
        margin-bottom: 17px;
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

      /deep/.el-table {
        width: 1568px !important;
        background: #f8f8f8;
        margin-left: 27px;
        margin-right: 45px;
        &::before {
          height: 0;
        }
        .el-table__row {
          .cell {
            display: flex;
            justify-content: center;
          }
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

      /deep/.el-dialog__wrapper {
        .el-dialog {
          width: 700px;
          .el-dialog__body {
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
  }
  /deep/.el-dialog__wrapper {
    .el-dialog {
      width: 700px;
      .el-dialog__body {
        .el-form {
          .el-row {
            // display: flex;
            // justify-content: center;
            margin-bottom: 29px;
            margin-left: 60px;

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
}
</style>
