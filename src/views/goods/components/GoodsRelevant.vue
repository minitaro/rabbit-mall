<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLazyLoad } from '@/hooks/useLazyLoad.js'
import { findRelevantGoodsAPI } from '@/api/goods';

const route = useRoute()
const { target, result } = useLazyLoad(() => findRelevantGoodsAPI({ id: route.params.id }))
// 推荐商品列表
const goodsList = ref(result)
// 滑块数组（每个滑块4件商品，共4个滑块）
const sliders = computed(() => {
  let list = []
  const pageSize = 4
  const pageCount = Math.ceil(goodsList.value.length / pageSize)
  for (let i = 0; i < pageCount; i++) {
    list.push(goodsList.value.slice(pageSize * i, pageSize * (i + 1)))
  }
  return list
}) 
</script>



<template>
  <div class="goods-relevant" ref="target">
    <div class="header">
      <i class="icon" />
      <span class="title">{{ $route.params.id?'同类商品推荐':'猜你喜欢' }}</span>
    </div>
    <el-carousel autoplay="false" indicator-position="outside">
      <el-carousel-item v-for="(slider,i) in sliders" :key="i">
        <div class="slider">
          <RouterLink v-for="goods in slider" :key="goods.id" :to="`/goods/${goods.id}`">
            <img :src="goods.picture" alt="">
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang="scss">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid $xtxColor;
      border-right: 4px solid $xtxColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten($xtxColor, 40%);
      }
    }
  }
  .el-carousel {
    &__item {
      width: 100%;
      height: 100%;
      position: absolute;
      transition: opacity .2s linear;
      .slider {
        display: flex;
        justify-content: space-around;
        padding: 0 40px;
        > a {
          width: 240px;
          text-align: center;
          img {
            padding: 20px;
            width: 230px!important;
            height: 230px!important;
            background: #fff;
          }
          .name {
            font-size: 16px;
            color: #666;
            padding: 0 40px;
          }
          .price {
            font-size: 16px;
            color: $priceColor;
            margin-top: 15px;
          }
        }
      }
    }
  }
}
</style>