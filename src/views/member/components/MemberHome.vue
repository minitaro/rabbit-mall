<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user.js'
import { findCollectAPI } from '@/api/collect.js'
import GoodsRelevant from '@/views/goods/components/GoodsRelevant.vue'

const userStore = useUserStore()
// 收藏的商品列表
const collectGoods = ref([])
const getCollect = () => findCollectAPI({page: 1, pageSize: 4}).then(data => collectGoods.value = data.result.items)
onMounted(() => getCollect())
</script>

<template>
  <div class="member-home">
    <!-- 概览 -->
    <div class="home-overview">
      <!-- 用户信息 -->
      <div class="user-meta">
        <div class="avatar">
          <img :src="userStore.userInfo.avatar"/>
        </div>
        <h4>{{ userStore.userInfo.nickname || userStore.userInfo.account }}</h4>
      </div>
      <div class="item">
        <a href="javascript:;">
          <span class="iconfont icon-hy"></span>
          <p>会员中心</p>
        </a>
        <a href="javascript:;">
          <span class="iconfont icon-aq"></span>
          <p>安全设置</p>
        </a>
        <a href="javascript:;">
          <span class="iconfont icon-dw"></span>
          <p>地址管理</p>
        </a>
      </div>
    </div>
    <div class="home-panel">
      <div class="header">
        <h4>我的收藏</h4>
        <AppMore to="/" />
      </div>
      <!-- 商品列表 -->
      <div class="goods-list">
        <AppGoodsItem v-for="item in collectGoods" :key="item.id" :goods="item" :isLink="false"></AppGoodsItem>
      </div>
    </div>
    <GoodsRelevant />
  </div>
  
</template>

<style scoped lang="scss">
.home-overview {
  height: 132px;
  background: url("@/assets/images/center-bg.png") no-repeat center / cover;
  display: flex;
  .user-meta {
    flex: 1;
    display: flex;
    align-items: center;
    .avatar {
      width: 85px;
      height: 85px;
      border-radius: 50%;
      overflow: hidden;
      margin-left: 60px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    h4 {
      padding-left: 26px;
      font-size: 18px;
      font-weight: normal;
      color: white;
    }
  }
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    &:first-child {
      border-right: 1px solid #f4f4f4;
    }
    a {
      color: white;
      font-size: 16px;
      text-align: center;
      .iconfont {
        font-size: 32px;
      }
      p {
        line-height: 32px;
      }
    }
  }
}
.home-panel {
  background-color: #fff;
  padding: 0 20px;
  margin-top: 20px;
  height: 400px;
  .header {
    height: 66px;
    border-bottom: 1px solid #f5f5f5;
    padding: 18px 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    h4 {
      font-size: 22px;
      font-weight: normal;
    }
  }
  .goods-list {
    display: flex;
    justify-content: space-around;
    padding-top: 20px;
  }
}
</style>
