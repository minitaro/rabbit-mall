<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  goods: {
    type: Object,
    default: () => ({})
  }
})
// 默认地址信息
const defaultAddress = ref(
  props.goods.userAddresses?.length ? 
  props.goods.userAddresses.find(item => item.isDefault === 1) : 
  {
    isDefault: 1,
    provinceCode: '110000',
    cityCode: '110100',
    countyCode: '110101',
    fullLocation: '北京 北京市 东城区'
  }
)
const fullLocation =  computed(() => defaultAddress.value.fullLocation)
// 配送地址变化
const addressChange = (selectedArea) => {
  defaultAddress.value.provinceCode = selectedArea.provinceCode
  defaultAddress.value.cityCode = selectedArea.cityCode
  defaultAddress.value.countyCode = selectedArea.countyCode
  defaultAddress.value.fullLocation = selectedArea.fullLocation
}
</script>



<template>
  <div class="g-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送, App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>
        <b style="vertical-align: middle; padding-right: 5px; font-weight: normal">至</b>
        <AppArea @address-change="addressChange" :full-location="fullLocation" />
      </dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
</template>



<style scoped lang="scss">
.app-area {
  vertical-align: middle;
}
.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: "•";
            color: $xtxColor;
            margin-right: 2px;
          }
        }
        a {
          color: $xtxColor;
        }
      }
    }
  }
}
</style>