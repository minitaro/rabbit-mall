<script setup>
import { inject } from 'vue'
const goods = inject('goods')
</script>



<template>
  <div class="goods-crumb">
    <AppBreadcrumb separator="iconfont icon-angle-right">
      <AppBreadcrumbItem to="/">
        首页
      </AppBreadcrumbItem>
      <AppBreadcrumbItem :to="`/category/${goods.categories[1].id}`">
        {{ goods.categories[1].name }}
      </AppBreadcrumbItem>
      <AppBreadcrumbItem :to="`/category/sub/${goods.categories[0].id}`">
        {{ goods.categories[0].name }}
      </AppBreadcrumbItem>
      <AppBreadcrumbItem>
        {{ goods.name }}
      </AppBreadcrumbItem>
    </AppBreadcrumb>
  </div>
</template>



<style scoped lang="scss">
.goods-crumb {
  padding: 25px 0;
  color: #666;
}
</style>