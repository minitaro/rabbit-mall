<script setup>
defineProps({
  topCategory: {
    type: Object,
    default: () => ({})
  }
})
</script>



<template>
  <div class="bread-container">
    <AppBreadcrumb separator="iconfont icon-angle-right">
      <AppBreadcrumbItem to="/">首页</AppBreadcrumbItem>
      <Transition name="fade-right" mode="out-in">
        <AppBreadcrumbItem :key="topCategory.id">{{ topCategory.name }}</AppBreadcrumbItem>
      </Transition>
    </AppBreadcrumb>
  </div>
</template>



<style scoped lang="scss">
.bread-container {
  display: flex;
  padding: 25px 10px;
}
</style>