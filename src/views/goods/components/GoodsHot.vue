<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLazyLoad } from '@/hooks/useLazyLoad.js'
import { findHotGoodsAPI } from '@/api/goods.js'

const props = defineProps({
  // 热榜类型
  type: {
    type: Number,
    default: 1
  }
})
// 类型数据字典
const types = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
const title = computed(() => types[props.type])
// 获取热榜
const route = useRoute()
const { result, target } = useLazyLoad(() => findHotGoodsAPI({ id: route.params.id, type: props.type }))
const hotList = ref(result)
</script>



<template>
  <div class="goods-hot" ref="target">
    <h3>{{ title }}</h3>
    <div v-if="hotList">
      <AppGoodsItem v-for="item in hotList" :key="item.id" :goods="item" />
    </div>
  </div>
</template>



<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>