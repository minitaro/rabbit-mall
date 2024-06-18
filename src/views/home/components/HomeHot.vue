<script setup>
import { ref } from 'vue'
import { useLazyLoad } from '@/hooks/useLazyLoad.js'
import { findHotAPI } from '@/api/home';
import HomePanel from './HomePanel.vue';

const { target, result } = useLazyLoad(findHotAPI)
const hotList = ref(result)
</script>

<template>
  <div class="home-hot">
    <HomePanel title="人气推荐" subtitle="人气爆款 不容错过">
      <div ref="target" style="position: relative; height: 426px;">
        <!-- 面板内容 -->
        <Transition name="fade">
          <ul v-if="hotList.length" class="goods-list">
            <li v-for="item in hotList" :key="item.id">
              <RouterLink to="/">
                <img v-lazy-img="item.picture" alt="">
                <p class="name ellipsis">{{item.title}}</p>
                <p class="desc">{{item.alt}}</p>
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
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    @include hoverShadow;
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
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