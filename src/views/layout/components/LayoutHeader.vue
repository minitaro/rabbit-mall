<script setup>
import LayoutHeaderNav from './LayoutHeaderNav.vue'
import LayoutHeaderCart from './LayoutHeaderCart.vue'
</script>

<template>
  <header class="layout-header">
    <div class="container">
      <h1 class="logo"><RouterLink to="/">小兔鲜</RouterLink></h1>
      <LayoutHeaderNav /> <!-- 头部分类导航组件 -->
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <LayoutHeaderCart /> <!-- 头部购物车组件 -->
    </div>
  </header>
</template>

<style scoped lang="scss">
.layout-header {
  background: #fff;
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }
  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;
    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }
    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }
}
</style>