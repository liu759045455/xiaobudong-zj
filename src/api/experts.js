import axios from "./http";

//专家库注册
export function expertsRegistered(data) {
    return axios({
        url: "/api/member/expert/register",
        method: "POST",
        data: data
    });
}


//专家库登录
export function loginExpert(data) {
    return axios({
        url: "/api/member/expert/login",
        method: "POST",
        data: data
    });
}

//专家库找回密码

export function forgetExpert(data) {
    return axios({
        url: "/api/member/forgetPassWord",
        method: "POST",
        data: data
    });
}

// 基本信息新增
export function addBasicExpert(data) {
    return axios({
        url: "/api/views/expert/member/insertOrUpdateBaseInfo",
        method: "POST",
        data: data
    });
}

//所学专业
export function getProfessional(params) {
    return axios({
        url: "/api/views/dictData/list",
        method: "GET",
        params
    });
}
// 获取评标列表
export function MajorList(query) {
    return axios({
        url: "/api/expert/project/getBidEvaluation",
        method: "get",
        params: query
    });
}

/**
 * 获取专家信息
 * @param {*} query 
 */
export function getBaseInfo(query) {
    return axios({
        url: `/api/views/expert/member/queryBaseInfo/${query}`,
        method: "get",
    });
}


// 评标专业新增
export function addEvaluateMajor(data) {
    return axios({
        url: "/api/views/expert/member/addEvaluateMajor",
        method: "POST",
        data: data
    });
}


//评标专业列表查询 
export function getEvaluateMajorList(params) {
    return axios({
        url: "/api/views/expert/member/evaluateMajorList",
        method: "GET",
        params
    });
}


//技术职称列表查询 
export function getTechnicalTitleList(params) {
    return axios({
        url: "/api/views/expert/member/technicalTitleList",
        method: "GET",
        params
    });
}

// 技术职称新增
export function addTechnicalTitle(data) {
    return axios({
        url: "/api/views/expert/member/addTechnicalTitle",
        method: "POST",
        data: data
    });
}

//技术资格列表查询 
export function getDutyQual(params) {
    return axios({
        url: "/api/views/expert/member/dutyQualificationList",
        method: "GET",
        params
    });
}


// 技术资格新增
export function addDutyQual(data) {
    return axios({
        url: "/api/views/expert/member/addDutyQualification",
        method: "POST",
        data: data
    });
}

//技术资格列表查询 
export function getCertif(params) {
    return axios({
        url: "/api/views/expert/member/relevantCertificateList",
        method: "GET",
        params
    });
}

//相关证书查询
export function getCertificateList(params) {
    return axios({
        url: "/api/views/expert/member/relevantCertificateList",
        method: "GET",
        params
    });
}


// 相关证书提交
export function addRelevantCertificates(data) {
    return axios({
        url: "/api/views/expert/member/addRelevantCertificates",
        method: "POST",
        data: data
    });
}
// 获取项目评分
export function ProjectList(query) {
    return axios({
        url: "/api/expert/project/getProjectScore",
        method: "get",
        params:query
    });
}

// 我的消息列表查询
export function NewList(memberId) {
    return axios({
        url: `/api/web/messageRecord/list?memberId=${memberId}`,
        method: "get",
    });
}

// 修改密码
export function AmendPass(data) {
    return axios({
        url: "/api/member/modifyPassWord",
        method: "post",
        data
    });
}

// 修改密码
export function LogoutCancel(data) {
    return axios({
        url: "/api/member/cancel",
        method: "post",
        data
    });
}



/**
 * 获取专家信息
 * @param {*} query 
 */
export function getQueryDegree(query) {
    return axios({
        url: `/api/views/expert/member/queryDegree/${query}`,
        method: "get",
    });
}

/**
 * 是否允许注册新专家
 * @param {*} query 
 */
export function getsysData() {
    return axios({
        url: `/api/views/sysData/1`,
        method: "get",
    });
}
