<script setup>
import LayoutHeaderNav from '@/views//layout/components/LayoutHeaderNav.vue'
import LayoutHeaderCart from '@/views/layout/components/LayoutHeaderCart.vue'
</script>


<template>
  <AppTopAffix>
    <RouterLink class="logo" to="/" />
    <LayoutHeaderNav />
    <template #right>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <LayoutHeaderCart />
    </template>
  </AppTopAffix>
</template>



<style scoped lang="scss">
.logo {
  width: 200px;
  height: 80px;
  background: url('@/assets/images/logo.png') no-repeat right 2px;
  background-size: 160px auto;
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
    width: 120px;
    padding-left: 5px;
    color: #666;
  }
}
</style>