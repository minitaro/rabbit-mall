import request from '@/utils/request'

/**
 * @description: 结算页面-生成订单
 * @author TMC
 * @date 2023-05-20 10:53:02
 */
export const createOrderAPI = () => request('/member/order/pre', 'get')



/**
 * @description: 结算页面-生成订单-根据订单中商品-再次购买
 * @param {String} orderId - 订单id
 * @author TMC
 * @date 2023-05-20 10:55:36
 */
export const repurchaseOrderAPI = (orderId) => request(`/member/order/repurchase/${orderId}`, 'get')



/**
 * @description: 结算页面-提交订单
 * @param {Type} param - 参数
 * @author TMC
 * @date 2023-05-20 11:06:50
 */
export const submitOrderAPI = (params) => request('/member/order', 'post', params)


/**
 * @description: 获取订单明细
 * @param {String} orderId - 订单id
 * @author TMC
 * @date 2023-05-20 11:10:53
 */
export const findOrderDetailAPI = (orderId) => request(`/member/order/${orderId}`, 'get')


/**
 * @description: 获取订单列表
 * @param {String} page - 页码
 * @param {String} pageSize - 每页条数
 * @param {String} orderState - 订单状态，1为待付款、2为待发货、3为待收货、4为待评价、5为已完成、6为已取消，未传该参数或0为全部
 * @author TMC
 * @date 2023-05-20 11:12:08
 */
export const findOrderListAPI = ({ page = 1, pageSize = 10, orderState = 0 }) => request('/member/order', 'get', { page, pageSize, orderState })


/**
 * @description: 取消订单
 * @param {String} orderId - 订单id
 * @param {String} cancelReason - 取消原因
 * @author TMC
 * @date 2023-05-20 11:14:06
 */
export const cancelOrderAPI = ({ orderId, cancelReason }) => request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })


/**
 * @description: 删除订单
 * @param {String} orderId - 订单id
 * @author TMC
 * @date 2023-05-20 11:14:56
 */
export const deleteOrderAPI = (orderId) => request('/member/order', 'delete', { ids: [orderId] })


/**
 * @description: 确认收货
 * @param {String} orderId - 订单id
 * @author TMC
 * @date 2023-05-20 11:17:30
 */
export const confirmReceiptAPI = (orderId) => request(`/member/order/${orderId}/receipt`, 'put')


/**
 * @description: 查询物流
 * @param {String} orderId - 订单id
 * @author TMC
 * @date 2023-05-20 11:19:31
 */
export const queryLogisticsAPI = (orderId) => request(`/member/order/${orderId}/logistics`, 'get')

