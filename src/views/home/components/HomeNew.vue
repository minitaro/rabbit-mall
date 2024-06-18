<script setup>
import { ref } from 'vue'
import { useLazyLoad } from '@/hooks/useLazyLoad.js'
import { findNewAPI } from '@/api/home';
import HomePanel from './HomePanel.vue';

const { target, result } = useLazyLoad(findNewAPI)
const goods = ref(result)
</script>



<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" subtitle="新鲜出炉 品质靠谱">
      <template #right><AppMore path="/" /></template>
      <div ref="target" style="position: relative; height: 426px;">
        <Transition name="fade">
          <ul v-if="goods.length" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/goods/${item.id}`">
                <img v-lazy-img="item.picture" alt="">
                <p class="name ellipsis">{{item.name}}</p>
                <p class="price">&yen;{{item.price}}</p>
              </RouterLink>
            </li>
          </ul>
          <div v-else class="skeleton">
            <div class="item" v-for="i in 4" :key="i" style="backgroundColor: #f0f9f4">
              <AppSkeleton bgColor="#e4e4e4" width="306px" height="306px" animated />
            </div>
          </div>
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>



<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    @include hoverShadow;
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: $priceColor;
    }
  }
}

.skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
  }
}
</style>