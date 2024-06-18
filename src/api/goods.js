import request from '@/utils/request'

/**
 * @description: 获取商品详情
 * @param {String} id - 商品ID
 * @author TMC
 * @date 2023-05-16 10:09:11
 */
export const findGoodsAPI = (id) => request('/goods', 'get', { id })



/**
 * @description: 获取商品同类推荐-未传入ID为猜喜欢
 * @param {String} id - 商品ID
 * @param {Number} limit - 获取条数
 * @author TMC
 * @date 2023-05-16 10:10:17
 */
export const findRelevantGoodsAPI = ({ id, limit = 16 }) => request('/goods/relevant', 'get', { id, limit })



/**
 * @description: 获取热榜商品
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
 * @param {Number} limit - 获取个数
 * @author TMC
 * @date 2023-05-16 10:10:57
 */
export const findHotGoodsAPI = ({ id, limit = 3, type = 1 }) => request('/goods/hot', 'get', { id, type, limit })



/**
 * @description: 获取商品的评价统计信息
 * @param {String} id - 商品ID
 * @author TMC
 * @date 2023-05-16 10:15:51
 */
export const findCommentInfoByGoodsAPI = (id) => request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')



/**
 * @description: 获取商品的评价列表信息
 * @param {String} id - 商品ID
 * @param {Object} params - 筛选条件
 * @author TMC
 * @date 2023-05-16 10:16:48
 */
export const findCommentListByGoodsAPI = (id, params) => request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)



/**
 * @description: 获取商品的最新价格和库存和是否有效
 * @param {String} skuId - 商品SKUID
 * @author TMC
 * @date 2023-05-16 10:18:29
 */
export const findGoodsNewInfoAPI = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * @description: 获取商品属性和sku信息
 * @param {String} skuId - 商品SKUID
 * @author TMC
 * @date 2023-05-16 10:19:01
 */
export const findGoodsSkusAPI = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}