// 配送时间
export const  DELIVERY_TIME_TYPE = {
  FREE: { value: 1, desc: '不限: 周一至周日' },
  WEEKDAY: { value: 2, desc: '工作日: 周一至周五' },
  WEEKEND_OR_HOLIDAY: { value: 3, desc: '双休或者假日: 周六至周日' }
}

// 支付方式
export const  PAY_TYPE = {
  ONLINE: { value: 1, desc: '在线支付' },
  CASH_ON_DELIVERY: { value: 2, desc: '货到付款 (需付5元手续费)' }
}

// 订单状态
export const ORDER_STATUS = {
  ALL: { value: 0, name: 'all', desc: '全部订单' },
  UNPAY: { value: 1, name: 'unpay', desc: '待付款' },
  DELIVER: { value: 2, name: 'deliver', desc: '待发货' },
  RECEIVE: { value: 3, name: 'receive', desc: '待收货' },
  COMMENT: { value: 4, name: 'comment', desc: '待评价' },
  COMPLETE: { value: 5, name: 'complete', desc: '已完成' },
  CANCEL: { value: 6, name: 'cancel', desc: '已取消' }
}

// 订单取消原因
export const CANCEL_REASON = [
  '配送信息有误',
  '商品买错了',
  '重复下单/误下单',
  '忘记使用优惠券、兔币等',
  '其他渠道价格更低',
  '不想买了'
]