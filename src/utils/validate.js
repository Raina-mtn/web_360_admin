// 正则表达式
// 手机号
export function isPhone(val) {
  return /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(val)
}
// 身份证
export function isIdCard(val) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val)
}
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
export function isUserId(val) {
  return /^[A-Za-z0-9]+$/.test(val)
}
export function isUser(val) {
  return/^\w+$/.test(val)
}

export const validatePassword = (rule, value, callback) => {
  if (value && !isUserId(value)) {
    callback(new Error("密码格式应为字母、数字"));
  } else {
    callback();
  }
};
export const validateUserId = (rule, value, callback) => {
  if (value && !isUserId(value)) {
    callback(new Error("工号格式应为字母、数字"));
  } else {
    callback();
  }
};
export const validateUser = (rule, value, callback) => {
  if (value && !isUser(value)) {
    callback(new Error("用户名格式应为字母、数字或下划线组合"));
  } else {
    callback();
  }
};