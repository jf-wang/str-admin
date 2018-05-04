export function textFrom(rule, value, callback) {
  if (!value) {
    callback(new Error('不能为空'))
  } else {
    callback()
  }
}
export function select(rule, value, callback) { // 下拉框
  if (!value) {
    return callback(new Error('请选择'))
  } else {
    callback()
  }
}
export function loginName(rule, value, callback) { // 登录名
  const regFormat = /^[\u4E00-\u9FA5A-Za-z ]+$/ // 正确 姓名
   if (!value) {
    callback(new Error('请输入登录名'))
   }else if (!regFormat.test(value)) {
    callback(new Error('只允许中文或英文'))
  } else {
    callback()
  }
}
export function phone(rule, value, callback) { // 手机号
  const regFormat = /^[1][3578][0-9]{9}$/ // 正确手机号
  if (value && !regFormat.test(value)) {
    callback(new Error('请输入正确手机号，11位'))
  } else {
    callback()
  }
}
export function card(rule, value, callback) { // 身份证号码
  const regFormat = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/ // 正确 身份证号码
  if (value && !regFormat.test(value)) {
    callback(new Error('请输入正确的身份证号，18位'))
  } else {
    callback()
  }
}

export function name(rule, value, callback) { // 姓名
  const regFormat = /^[\u4E00-\u9FA5A-Za-z ]+$/ // 正确 姓名
   if (!value) {
    callback(new Error('请输入姓名'))
   }else if (!regFormat.test(value)) {
    callback(new Error('只允许中文或英文'))
  } else {
    callback()
  }
}


export function auKey(rule, value, callback) { // 姓名
  const regFormat = /^[a-zA-Z\d]+$/
   if (!value) {
    callback(new Error('请输入局部Key'))
   }else if (!regFormat.test(value)) {
    callback(new Error('只允许中文大小写英文以及下划线'))
  } else {
    callback()
  }
}
export function auName(rule, value, callback) { // 姓名
   if (!value) {
    callback(new Error('请输入权限名'))
   } else {
    callback()
  }
}
export function roleKey(rule, value, callback) { // 姓名
   if (!value) {
    callback(new Error('请输入局部Key'))
   } else {
    callback()
  }
}
export function roleName(rule, value, callback) { // 姓名
   if (!value) {
    callback(new Error('请输入角色名'))
   } else {
    callback()
  }
}