<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useCategoryStore } from '@/stores/category';

const route = useRoute()
const categoryStore = useCategoryStore()
const crumb = computed(() => {
  let crumb = {}
  categoryStore.categoryList.forEach(top => {
    if (top.children) {
      let sub = top.children.find(sub => sub.id === route.params.id)
      if (sub) {
        crumb.top = { id: top.id, name: top.name }
        crumb.sub = { id: sub.id, name: sub.name }
      }
    }
  })
  return crumb
})
</script>



<template>
  <div class="bread-container">
    <AppBreadcrumb separator="iconfont icon-angle-right">
      <AppBreadcrumbItem to="/">首页</AppBreadcrumbItem>
      <AppBreadcrumbItem
        v-if="crumb.top"
        :key="crumb.top.id" 
        :to="`/category/${crumb.top.id}`">
        {{ crumb.top.name }}
      </AppBreadcrumbItem>
      <Transition name="fade-right" mode="out-in">
        <AppBreadcrumbItem
          v-if="crumb.sub" 
          :key="crumb.sub.id">
          {{ crumb.sub.name }}
        </AppBreadcrumbItem>
      </Transition>
    </AppBreadcrumb>
  </div>
</template>



<style scoped lang="scss">
.bread-container {
  padding: 25px 0;
  color: #666;
}
</style>