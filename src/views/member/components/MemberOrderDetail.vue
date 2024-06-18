<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCountDown } from '@/hooks/useCountDown.js'
import { findOrderDetailAPI } from '@/api/order'
import { ORDER_STATUS } from '@/constants/order.js'

const route = useRoute()
const { start, formatTime } = useCountDown()
const order = ref(null)
onMounted(() => {
  findOrderDetailAPI(route.params.id).then(data => {
    order.value = data.result
    start(order.value.countdown)
  })
})
const orderStatus = computed(() => Object.keys(ORDER_STATUS).find(key => ORDER_STATUS[key].value === order.value.orderState))

</script>



<template>
  <div class="member-order-detail" v-if="order">
    <!-- 头部 -->
    <div class="detail-action">
      <div class="state">
        <span class="iconfont" :class="`icon-order-${orderStatus?.toLowerCase()}`"></span>
        <p>{{ ORDER_STATUS[orderStatus]?.desc }}</p>
        <p v-if="order.countdown > -1">付款截止：{{ formatTime }}</p>
        <p v-if="order.orderState === 1 && order.countdown < 0">订单超时</p>
      </div>
      <div class="info">
        <p>订单编号：{{ order.id }}</p>
        <p>下单时间：{{ order.createTime }}</p>
      </div>
      <div class="btn">
        <!-- 待付款 -->
        <template v-if="order.orderState === 1 && order.countdown > -1">
          <el-button @click="$router.push(`/pay?orderId=${order.id}`)" type="primary">立即付款</el-button>
          <el-button @click="handlerCancel(order)" type="danger">取消订单</el-button>
        </template>
        <template v-if="order.orderState === 1 && order.countdown < 0">
          <el-button @click="$router.push(`/checkout?orderId=${order.id}`)" type="primary">重新下单</el-button>
        </template>
        <!-- 待发货 -->
        <template v-if="order.orderState === 2">
          <el-button @click="$router.push(`/checkout?orderId=${order.id}`)" type="primary">再次购买</el-button>
        </template>
        <!-- 待收货 -->
        <template v-if="order.orderState === 3">
          <el-button @click="handlerConfirm(order)" type="primary" >确认收货</el-button>
          <el-button  @click="$router.push(`/checkout?orderId=${order.id}`)" type="plain">再次购买</el-button>
        </template>
        <!-- 待评价 -->
        <template v-if="order.orderState === 4">
          <el-button  @click="$router.push(`/checkout?orderId=${order.id}`)" type="primary" >再次购买</el-button>
          <el-button type="primary" >评价商品</el-button>
          <el-button type="info" >申请售后</el-button>
        </template>
        <!-- 已完成 -->
        <template v-if="order.orderState === 5">
          <el-button  @click="$router.push(`/checkout?orderId=${order.id}`)" type="primary" >再次购买</el-button>
          <el-button type="primary" >查看评价</el-button>
          <el-button type="info" >申请售后</el-button>
        </template>
        <!-- 已取消 -->
      </div>
    </div>
    <!-- 进度 -->
    <div class="detail-step">
      <el-steps :active="order.orderState === 6 ? 1 : order.orderState" align-center>
        <el-step title="提交订单" :description="order.createTime" />
        <el-step title="付款成功" :description="order.payTime" />
        <el-step title="商品发货" :description="order.consignTime" />
        <el-step title="确认收货" :description="order.endTime" />
        <el-step title="订单完成" :description="order.evaluationTime" />
      </el-steps>
    </div>

    <!-- 信息 -->
    <div class="order-info">
      <!-- 商品列表 -->
      <h3>订单商品</h3>
      <table class="goods-table">
        <thead>
          <tr>
            <th width="400">商品信息</th>
            <th>单价</th>
            <th>数量</th>
            <th>小计</th>
            <th>实付</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.skus" :key="item.id">
            <td>
              <a href="javascript:;" class="product">
                <img v-lazy-img="item.image" alt="" />
                <div class="info">
                  <p class="name ellipsis">{{ item.name }}</p>
                  <p class="attrs ellipsis">{{ item.attrsText }}</p>
                </div>
              </a>
            </td>
            <td>¥{{ item.curPrice }}</td>
            <td>{{ item.quantity }}</td>
            <td>¥{{ item.realPay }}</td>
            <td>¥{{ item.realPay }}</td>
          </tr>
        </tbody>
      </table>
      <!-- 收货信息 -->
      <h3>收货信息</h3>
      <div class="info-box">
        <dl>
          <dt>收<i></i>货<i></i>人：</dt>
          <dd>{{ order.receiverContact }}</dd>
        </dl>
        <dl>
          <dt>联系方式：</dt>
          <dd>{{ order.receiverMobile.replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2') }}</dd>
        </dl>
        <dl>
          <dt>收货地址：</dt>
          <dd>{{ order.receiverAddress }}</dd>
        </dl>
      </div>
      <!-- 支付方式及送货时间 -->
      <h3>支付方式及送货时间</h3>
      <div class="info-box">
        <dl>
          <dt>支付方式：</dt>
          <dd>支付宝</dd>
        </dl>
        <dl>
          <dt>送货时间：</dt>
          <dd>双休日、假日送货(适合于家庭地址)</dd>
        </dl>
      </div>
      <!-- 发票信息 -->
      <h3>发票信息</h3>
      <div class="info-box">
        <dl>
          <dt>发票类型：</dt>
          <dd>电子发票</dd>
        </dl>
        <dl>
          <dt>发票内容：</dt>
          <dd>日用品</dd>
        </dl>
        <dl>
          <dt>发票抬头：</dt>
          <dd>个人</dd>
        </dl>
      </div>
      <!-- 订单信息 -->
      <h3>订单信息</h3>
      <div class="info-box">
        <dl>
          <dt>订单编号：</dt>
          <dd>在线支付</dd>
        </dl>
        <dl>
          <dt>下单时间：</dt>
          <dd>{{ order.createTime }}</dd>
        </dl>
      </div>
      <!-- 汇总信息 -->
      <div class="sum-info">
        <div class="info">
          <div class="item">
            <label>商品件数：</label>
            <span>{{ order.totalNum }}件</span>
          </div>
          <div class="item">
            <label>商品总价：</label>
            <span>¥{{ order.totalMoney }}</span>
          </div>
          <div class="item">
            <label>运<i></i>费：</label>
            <span>{{ order.postFee }}</span>
          </div>
          <div class="item">
            <label>应付总额：</label>
            <span class="price">¥{{ order.payMoney }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped lang="scss">
.member-order-detail {
  background: #fff;
  height: 100%;
}
.loading {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
}
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: $xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
.order-info {
  padding: 0 50px;
  h3 {
    font-weight: normal;
    font-size: 16px;
    padding: 25px 5px;
  }
}
// 商品表格
.goods-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 0 auto;
  th {
    font-weight: normal;
    line-height: 60px;
    background: #f5f5f5;
    &:first-child {
      text-align: left;
      padding-left: 20px;
    }
  }
  td {
    border-bottom: 1px solid #f5f5f5;
    text-align: center;
    &:first-child {
      padding-left: 20px;
      border-left: 1px solid #f5f5f5;
    }
    &:last-child {
      border-right: 1px solid #f5f5f5;
    }
  }
  .product {
    display: flex;
    padding: 20px 0;
    img {
      width: 70px;
      height: 70px;
      border: 1px solid #f5f5f5;
    }
    .info {
      align-self: center;
      padding-left: 20px;
      text-align: left;
      p {
        margin-bottom: 5px;
        width: 280px;
      }
      .attrs {
        color: #999;
      }
    }
  }
}
// 信息盒子
.info-box {
  border:1px solid #f5f5f5;
  padding: 20px;
  dl {
    display: flex;
    line-height: 30px;
    dt {
      width: 80px;
      color: #999;
      font-size: 14px;
      i {
        display: inline-block;
        width: 0.5em;
      }
    }
    dd {
      flex: 1;
    }
  }
}
// 汇总信息
.sum-info {
  padding: 30px 30px 100px 30px;
  overflow: hidden;
  .info {
    width: 250px;
    height: 160px;
    float: right;
    font-size: 16px;
    .item {
      line-height: 40px;
      display: flex;
      label {
        width: 90px;
        i {
          display: inline-block;
          width: 2em;
        }
      }
      span {
        flex: 1;
        text-align: right;
        padding-right: 30px;
        &.price {
          font-size: 20px;
          color: $priceColor;
        }
      }
    }
  }
}
</style>

