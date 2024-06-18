import request from '@/utils/request.js';


/**
 * @description: 添加购物车
 * @param {String} skuId - 商品skuId
 * @param {Integer} count - 加入购物车的商品数量
 * @author TMC
 * @date 2023-05-11 19:42:15
 */
export const addToCartAPI = ({ skuId, count }) => request('/member/cart', 'post', { skuId, count })


/**
 * @description: 批量删除购物车商品
 * @param {Array<string>} ids - 商品skuId集
 * @author TMC
 * @date 2023-05-19 01:20:32
 */
export const deleteFromCartAPI = (ids) => request('/member/cart','delete', { ids })


/**
 * @description: 获取购物车清单
 * @author TMC
 * @date 2023-05-11 19:44:36
 */
export const findCartListAPI = () => request('/member/cart', 'get')


/**
 * @description: 修改购物车（商品状态，数量）
 * @param {String} skuId - 商品skuId
 * @param {Integer} count - 加入购物车的商品数量
 * @param {Boolean} selected - 选中状态
 * @author TMC
 * @date 2023-05-19 01:26:29
 */
export const updateCartAPI = ({ skuId, selected, count }) => request(`/member/cart/${skuId}`, 'put', { selected, count })



/**
 * @description: 购物车商品全部选中&取消全选
 * @param {Boolean} selected - 选中状态
 * @param {Array<string>} ids - skuId 的集合
 * @author TMC
 * @date 2023-05-26 18:50:41
 */
export const allCheckCartAPI = ({ selected, ids }) => request('/member/cart/selected', 'put', { selected, ids })


/**
 * @description: 合并购物车
 * @param {Array<object>} cartList - 购物车信息列表
 * @param {String} object.skuId - 商品skuId
 * @param {Boolean} object.selected - 选中状态
 * @param {Integer} object.count - 商品数量
 * @author TMC
 * @date 2023-05-11 19:46:51
 */
export const mergeCartAPI = (cartList) => request('/member/cart/merge', 'post', cartList)



