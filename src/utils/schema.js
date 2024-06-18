import { userAccountCheckAPI } from '@/api/user'

// 给vee-validate提供校验规则函数
export default {
  // 用户账号校验
  account (value) {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\S{3,19}$/.test(value)) return '字母开头且4-20个字符'
    return true
  },
  // 用户账号服务端校验
  async accountApi (value) {
    if (!value) return '请输入用户名'
    if (!/^[a-zA-Z]\S{3,19}$/.test(value)) return '字母开头且4-20个字符'
    const data = await userAccountCheckAPI(value)
    if (data.result.valid) return '用户名已存在'
    return true
  },
  // 密码校验
  password (value) {
    if (!value) return '请输入密码'
    if (!/^\S{4,24}$/.test(value)) return '密码4-24个字符'
    return true
  },
  // 密码确认校验
  passwordConfirm (value, { form }) {
    if (!value) return '请确认密码'
    if (!/^\S{4,24}$/.test(value)) return '密码4-24个字符'
    if (value !== form.password) return '需要和密码保持一致'
    return true
  },
  // 手机号校验
  mobile (value) {
    if (!value) return '请输入手机号'
    if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式不对'
    return true
  },
  // 验证码校验
  code (value) {
    if (!value) return '请输入短信验证码'
    if (!/^\d{6}$/.test(value)) return '短信验证码6个数字'
    return true
  },
  // 是否勾选登录协议
  agree (value) {
    if (!value) return '请勾选登录协议'
    return true
  }
}
