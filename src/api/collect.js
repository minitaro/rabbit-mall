import request from '@/utils/request'

/**
 * @description: 获取收藏分页数据
 * @param {Integer} collectType - 收藏类型，1为商品，2为专题，3为品牌
 * @author TMC
 * @date 2023-05-24 11:29:59
 */
export const findCollectAPI = ({ page = 1, pageSize = 10, collectType = 1 }) => request('/member/collect', 'get', { page, pageSize, collectType })
