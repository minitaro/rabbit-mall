<script setup>
import TopCrumb from './components/TopCrumb.vue'
import TopBanner from './components/TopBanner.vue';
import SubList from './components/SubList.vue'
import RefGoods from './components/RefGoods.vue';
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '@/stores/category.js';

const route = useRoute()
const categoryStore = useCategoryStore()
// 当前页对应的顶级分类
const topCategory = computed(() => {
  let top = {}
  const item = categoryStore.categoryList.find(item => item.id === route.params.id)
  if (item) top = item
  return top
})
</script>



<template>
  <AppHeaderSticky />  <!-- 吸顶组件 -->
  <div class="top-category">
    <div class="container m-top-20">
      <TopCrumb :top-category="topCategory"/>   <!-- 面包屑 -->
      <TopBanner />   <!-- 轮播图 -->
      <SubList :sub-category-list="topCategory.children"/>  <!-- 二级分类列表 -->
      <RefGoods />  <!-- 参考商品列表 -->
    </div>
  </div>
</template>



<style scoped lang="scss">
.top-category {
  :deep(h3) {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
}
</style>