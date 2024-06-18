<script setup>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { findOrderDetailAPI } from '@/api/order.js'

const route = useRoute()

const order = ref(null)
const getOrderDetail = () => findOrderDetailAPI(route.query.orderId).then(data => order.value = data.result)
onMounted(() => getOrderDetail())
</script>

<template>
  <div class="pay-page">
    <div class="container">
      <AppBreadcrumb>
        <AppBreadcrumbItem to="/">首页</AppBreadcrumbItem>
        <AppBreadcrumbItem to="/cart">购物车</AppBreadcrumbItem>
        <AppBreadcrumbItem>支付结果</AppBreadcrumbItem>
      </AppBreadcrumb>
      <!-- 支付结果 -->
      <div class="pay-result">
        <span v-if="$route.query.payResult" class="iconfont icon-queren2 green"></span>
        <span v-else class="iconfont icon-shanchu red" ></span>
        <p class="tit">订单支付{{ $route.query.payResult?'成功':'失败' }}</p>
        <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
        <p>支付方式：<span>支付宝支付</span></p>
        <p>支付金额：<span class="red">¥{{ order?.payMoney }}</span></p>
        <div class="btn">
          <el-button @click="$router.push('/member/order')" type="primary" style="margin-right:20px">查看订单</el-button>
          <el-button @click="$router.push('/')" type="info">进入首页</el-button>
        </div>
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          温馨提示：小兔鲜儿不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  > .iconfont {
    font-size: 100px;
  }
  .green {
    color: #1dc779;
  }
  .red {
    color: @priceColor;
  }
  .tit {
    font-size: 24px;
  }
  .tip {
    color: #999;
  }
  p {
    line-height: 40px;
    font-size: 16px;
  }
  .btn {
    margin-top: 50px;
  }
  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>