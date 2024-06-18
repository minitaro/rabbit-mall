<script setup>
import LayoutTopnav from './components/LayoutTopnav.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutHeader from './components/LayoutHeader.vue'


</script>

<template>
  <LayoutTopnav />   <!-- 顶部导航组件 -->
  <LayoutHeader />   <!-- 头部组件 -->
  <div class="layout-body">
    <RouterView />  <!-- 二级路由出口组件 -->  
  </div>
  <LayoutFooter />   <!-- 底部组件 -->
</template>

<style scoped lang="scss">
.layout-body {
  min-height: 600px;
}
</style>