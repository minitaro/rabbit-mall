<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findOrderDetailAPI } from '@/api/order.js'
import { useCountDown } from '@/hooks/useCountDown.js'
import { baseURL } from '@/utils/request'

const route = useRoute()
const router = useRouter()
const { formatTime, start } = useCountDown()

// 订单详情
const orderDetail = ref(null)
const getOrderDetail = async () => {
  const data = await findOrderDetailAPI(route.query.orderId)
  orderDetail.value = data.result
  start(data.result.countdown)
}
onMounted(() => getOrderDetail())


// 支付成功回调地址
const backURL = 'http://127.0.0.1:5173/pay/callback'
const redirectURL = encodeURIComponent(backURL)
// 支付跳转地址
const payURL = `${baseURL}/pay/aliPay?orderId=${route.query.orderId}&redirect=${redirectURL}`

// 跳转支付时打开的对话框
const dialogVisible = ref(false)
let timer = null
const openDialog = () => {
  dialogVisible.value = true
  timer = setTimeout(() => router.push(`/member/order/${route.query.orderId}`), 180 * 1000)
}
onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<template>
  <div class="pay-page">
    <div class="container">
      <AppBreadcrumb>
        <AppBreadcrumbItem to="/">首页</AppBreadcrumbItem>
        <AppBreadcrumbItem to="/cart">购物车</AppBreadcrumbItem>
        <AppBreadcrumbItem >支付订单</AppBreadcrumbItem>
      </AppBreadcrumb>
      <!-- 付款信息 -->
      <div class="pay-info" v-if="orderDetail">
        <span class="icon iconfont icon-queren2"></span>
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <p v-if="orderDetail.countdown > -1">支付还剩 <span>{{ formatTime }}</span>, 超时后将取消订单</p>
          <p v-else>订单已经超时</p>
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{ orderDetail.payMoney?.toFixed(2) }}</span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a>
          <a class="btn alipay" :href="payURL" @click="openDialog" target="_blank"></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
    <el-dialog title="正在支付..." v-model="dialogVisible" >
      <div class="pay-wait">
        <img src="@/assets/images/load.gif" alt="">
        <div v-if="orderDetail">
            <p>支付成功：</p>
            <RouterLink :to="`/member/order/${$route.query.orderId}`">查看订单详情></RouterLink>
            <p>支付失败：</p>
            <RouterLink to="/">查看相关疑问></RouterLink>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.pay-page {
  margin-top: 20px;
}

.pay-wait {
  display: flex;
  justify-content: space-around;
  p {
    margin-top: 30px;
    font-size: 14px;
  }
  a {
    color: $xtxColor;
  }
  img {
    background: #fff;
  }
}
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon {
    font-size: 80px;
    color: #1dc779;
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;
    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;
    &.active,
    &:hover {
      border-color: $xtxColor;
    }
    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat center / contain;
    }
    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat center / contain;
    }
  }
}
</style>