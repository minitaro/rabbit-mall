<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeBrand from './components/HomeBrand.vue'
import HomeProduct from './components/HomeProduct.vue'
import HomeSpecial from './components/HomeSpecial.vue'
</script>

<template>
  <!-- 吸顶组件 -->
  <AppHeaderSticky />
  <div class="container">
    <div class="home-entry">
      <HomeCategory />    <!-- 左侧分类导航 -->
      <HomeBanner />      <!-- 轮播图 -->
    </div>
  </div>
  <HomeNew />     <!-- 新鲜好物 -->
  <HomeHot />     <!-- 人气推荐 -->
  <HomeBrand />   <!-- 热门品牌 -->
  <HomeProduct /> <!-- 产品区块 -->
  <HomeSpecial /> <!-- 最新专题 -->
</template>
