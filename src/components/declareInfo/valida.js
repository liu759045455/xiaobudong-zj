//基本信息
const basicEx = {
    sex: [{
        required: true,
    }],
    nation: [{
        required: true,
        message: "请选择民族",
        trigger: "blur"
    }],
    health: [{
        required: true,
        message: "请选择健康状况",
        trigger: "blur"
    }],
    graduateSchool: [{
        required: true,
        message: "请输入毕业院校",
        trigger: "blur"
    }],
    degree: [{
        required: true,
        message: "请输入学位",
        trigger: "blur"
    }],
    education: [{
        required: true,
        message: "请输入学历",
        trigger: "blur"
    }],
    major: [{
        required: true,
        message: "请选择所学专业",
        trigger: "blur"
    }],
    // foreignLanguages: [{
    //     required: true,
    //     message: "请输入外语语种",
    //     trigger: "blur"
    // }],
    // proficiency: [{
    //     required: true,
    //     message: "请选择熟练程度",
    //     trigger: "blur"
    // }],
    company: [{
        required: true,
        message: "请输入工作单位",
        trigger: "blur"
    }],
    duty: [{
        required: true,
        message: "请输入职务职级",
        trigger: "blur"
    }],
    // creditCode: [{
    //     required: true,
    //     message: "请输入统一社会信用代码",
    //     trigger: "blur"
    // }],
    workingYears: [{
        required: true,
        message: "请输入行业工作年限",
        trigger: "blur"
    }],
    // emergencyExpert: [{
    //     required: true,
    //     message: "请选择是否应急专家",
    //     trigger: "blur"
    // }],
    contactPhone: [{
        required: true,
        message: "请输入联系电话",
        trigger: "blur"
    }, {
        pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
        message: "联系电话格式不正确",
    }],
    bankAccount: [{
        required: true,
        message: "请输入银行账号",
        trigger: "blur"
    }],
    bank: [{
        required: true,
        message: "请输入开户行",
        trigger: "blur"
    }],

    // registerArea: [{
    //     required: true,
    //     message: "请输入注册地区",
    //     trigger: "blur"
    // }],


}


export {
    basicEx,
}