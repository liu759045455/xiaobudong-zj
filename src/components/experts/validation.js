/**
 * 专家登录验证
 */
const loginEx = {
    username: [{
            required: true,
            message: "请输入身份证号",
            trigger: "blur"
        },
        {
            //模式指的是正则表达式
            pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "身份证格式不正确"
        }
    ],
    password: [{
        required: true, //必填
        message: "请输入密码",
        trigger: "blur" //失去焦点触发
    }]
}


/**
 * 专家注册验证
 */
const regEx = {
    name: [{
        required: true,
        message: "请输入姓名",
        trigger: "blur"
    }, ],
    idCard: [{
            required: true,
            message: "请输入身份证号",
            trigger: "blur"
        },
        {
            //模式指的是正则表达式
            pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "身份证格式不正确"
        }
    ],
    email: [{
            required: true,
            message: "请输入邮箱账户",
            trigger: "blur"
        },
        {
            pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g,
            message: "邮箱格式不正确"
        }
    ],
    code: [{
            required: true,
            message: "请输入验证码",
            trigger: "blur"
        },
        {
            pattern: /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/,
            message: "验证码格式不正确"
        }
    ],
    phonenumber: [{
            required: true,
            message: "请输入手机号",
            trigger: "blur"
        },
        {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: "手机号格式不正确",
        },
    ],
    password: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
        },
        {
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
            message: "6-16位大小写字母、数字、符号组合"
        }
    ]
}

/**
 * 专家找回密码验证
 */
const backEx = {
    idCard: [{
            required: true,
            message: "请输入身份证号",
            trigger: "blur"
        },
        {
            //模式指的是正则表达式
            pattern: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "身份证格式不正确"
        }
    ],
    email: [{
            required: true,
            message: "请输入邮箱账户",
            trigger: "blur"
        },
        {
            pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.]){1,2}[A-Za-z\d]{2,5}$/g,
            message: "邮箱格式不正确"
        }
    ],

    code: [{
            required: true,
            message: "请输入验证码",
            trigger: "blur"
        },
        {
            pattern: /(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,23}/,
            message: "验证码格式不正确"
        }
    ],

    newPassWord: [{
            required: true,
            message: "请输入新密码",
            trigger: "blur"
        },
        {
            pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/,
            message: "6-16位大小写字母、数字、符号组合"
        }
    ]
}





export {
    loginEx,
    regEx,
    backEx
};