<script setup>
import { onMounted } from 'vue'
import { useCountDown } from '@/hooks/useCountDown.js'
import { ORDER_STATUS } from '@/constants/order.js'
const props = defineProps({
  order: {
    type: Object,
    default: () => ({})
  }
})
const { start, formatTime } = useCountDown()
onMounted(() => {
  if (props.order.countdown > -1) {
    start(props.order.countdown)
  }
})
</script>



<template>
  <div class="order-item">
    <div class="head">
      <span>下单时间：{{ order.createTime }}</span>
      <span>订单编号：{{ order.id }}</span>
      <span class="down-time" v-if="order.orderState === 1">
        <i class="iconfont icon-down-time"></i>
        <b v-if="props.order.countdown > -1">付款截止：{{ formatTime }}</b>
        <b v-else>订单超时</b>
      </span>
    </div>
    <div class="body">
      <div class="column goods">
        <ul>
          <li v-for="goods in order.skus" :key="goods.id">
            <RouterLink class="image" :to="`/goods/${goods.spuId}`">
              <img v-lazy-img="goods.image" alt="" />
            </RouterLink>
            <div class="info">
              <p class="name ellipsis-2">{{ goods.name }}</p>
              <p class="attr ellipsis">{{ goods.attrsText }}</p>
            </div>
            <div class="price">¥{{ goods.realPay }}</div>
            <div class="count">x{{ goods.quantity }}</div>
          </li>
        </ul>
      </div>
      <div class="column state">
        <p>{{ Object.values(ORDER_STATUS).find(item => item.value === order.orderState)?.desc }}</p>
        <!-- 待收货  查看物流 -->
        <!-- 待评价  评价商品 -->
        <!-- 已完成  查看评价 -->
        <p @click="$emit('on-logistics', order)" v-if="order.orderState === 3"><a class="green" href="javascript:;">查看物流</a></p>
        <p v-if="order.orderState === 4"><a class="green" href="javascript:;">评价商品</a></p>
        <p v-if="order.orderState === 5"><a class="green" href="javascript:;">查看评价</a></p>
      </div>
      <div class="column amount">
        <p class="red">¥{{ order.payMoney }}</p>
        <p> (含运费：¥{{ order.postFee }}) </p>
        <p>在线支付</p>
      </div>
      <div class="column action">
        <!-- 待支付：立即付款，查看详情，取消订单 -->
        <!-- 待发货：查看详情，再次购买 -->
        <!-- 待收货：确认收货，查看详情，再次购买 -->
        <!-- 待评价：查看详情，再次购买，申请售后 -->
        <!-- 已完成：查看详情，再次购买，申请售后 -->
        <!-- 已取消：查看详情 -->
        <el-button v-if="order.orderState === 1 && order.countdown > -1" 
                  @click="$router.push(`/pay?orderId=${order.id}`)" 
                  type="primary" size="small">
          立即付款
        </el-button>
        <el-button v-if="order.orderState === 1 && order.countdown > -1" 
                  @click="$emit('on-cancel', order)"
                  type="danger" size="small">
          取消订单
        </el-button>
        <el-button v-if="order.orderState === 1 && order.countdown < 0" 
                  @click="$router.push(`/checkout?orderId=${order.id}`)"
                  type="primary" size="small">
          重新下单
        </el-button>
        <el-button v-if="order.orderState===3" 
                  @click="$emit('on-confirm', order)" 
                  type="primary" size="small">
          确认收货
        </el-button>
        <el-button v-if="[2,3,4,5].includes(order.orderState)" 
                  @click="$router.push(`/checkout?orderId=${order.id}`)"
                  type="primary" size="small">
          再次购买
        </el-button>
        <el-button v-if="[4,5].includes(order.orderState)" 
                   type="primary" size="small">
          申请售后
        </el-button>
        <el-popconfirm v-if="[5,6].includes(order.orderState) || (order.orderState === 1 && order.countdown < 0)"
                       title="确认删除吗?" 
                       confirm-button-text="确认" 
                       cancel-button-text="取消" 
                      @confirm="$emit('on-delete', order)">
          <template #reference>
            <el-button type="danger" size="small">
              删除订单
            </el-button>
          </template>
        </el-popconfirm>
        <el-button @click="$router.push(`/member/order/${order.id}`)"
                    type="info" size="small">
          查看详情
        </el-button>
      </div>
    </div>
  </div>
  
</template>



<style scoped lang="scss">
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: $xtxColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: $priceColor;
        }
      }
      &.action {
        width: 140px;
      }
    }
  }
}
.el-button {
  margin: 5px 0;
}
</style>