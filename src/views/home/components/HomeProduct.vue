<script setup>
import { ref } from 'vue'
import { useLazyLoad } from '@/hooks/useLazyLoad.js'
import { findGoodsAPI } from '@/api/home'
import HomePanel from './HomePanel.vue'
import HomeGoods from './HomeGoods.vue'

const { target, result } = useLazyLoad(findGoodsAPI)
const categoryList = ref(result)
</script>

<template>
  <div class="home-product" ref="target">
    <template v-if="categoryList">
      <HomePanel :title="top.name" v-for="top in categoryList" :key="top.id">
        <template #right>
          <div class="sub">
            <RouterLink v-for="sub in top.children" :key="sub.id" :to="`/category/sub/${sub.id}`">
              {{ sub.name }}
            </RouterLink>
          </div>
          <AppMore :path="`/category/${top.id}`" />
        </template>
        <div class="box">
          <RouterLink class="cover" :to="`/category/${top.id}`">
            <img v-lazy-img="top.picture" alt="">
            <strong class="label">
              <span>{{ top.name }}馆</span>
              <span class="ellipsis">{{ top.saleInfo }}</span>
            </strong>
          </RouterLink>
          <ul class="goods-list">
            <li v-for="item in top.goods" :key="item.id">
              <HomeGoods :goods="item" />
            </li>
          </ul>
        </div>
      </HomePanel>
    </template>    
  </div>
</template>

<style scoped lang="scss">
.home-product {
  background: #fff;
  // height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: $xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0,-50%,0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0,0,0,.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0,0,0,.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n+4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>