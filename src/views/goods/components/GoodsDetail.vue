<script setup>
import { inject } from 'vue'
const goods = inject('goods')
</script>



<template>
  <div class="goods-detail">
    <!-- 属性 -->
    <ul class="attrs">
      <li v-for="item in goods.details.properties" :key="item.value">
        <span class="dt">{{ item.name }}</span>
        <span class="dd">{{ item.value }}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img v-for="item in goods.details.pictures" :key="item" v-lazy-img="item" alt="">
  </div>
</template>



<style scoped lang="scss">
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 100%;
      .dt {
        width: 125px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
        padding-right: 50px;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>
