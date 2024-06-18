import request from '@/utils/request'

/**
 * @description: 帐号密码登录
 * @param {String} account - 帐号
 * @param {String} password - 密码
 * @author TMC
 * @date 2023-05-18 17:37:30
 */
export const userAccountLoginAPI = ({ account, password }) => request('/login', 'post', { account, password })

/**
 * @description: 校验用户帐号是否存在
 * @param {String} account - 帐号
 * @author TMC
 * @date 2023-05-18 17:43:26
 */
export const userAccountCheckAPI = (account) => {
  return request('/register/check', 'get', { account })
}

/**
 * @description: QQ登录
 * @param {String} unionId - QQ唯一标识，openId
 * @param {String} source - 客户端类型 1 PC
 * @author TMC
 * @date 2023-05-18 17:39:25
 */
export const userQQLoginAPI = (unionId, source = 1) => {
  return request('/login/social', 'post', { unionId, source })
}

