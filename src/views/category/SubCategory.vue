<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryGoodsAPI } from '@/api/category';
import SubCrumb from './components/SubCrumb.vue'
import SubFilter from './components/SubFilter.vue'
import SubSort from './components/SubSort.vue'

const route = useRoute()
const goodsList = ref([])   // 次级分类下的商品列表
const loading = ref(false)  // 加载中
const finished = ref(false) // 是否加载完毕
// 商品查询条件参数
let params = {
  page: 1,
  pageSize: 20
}
// 获取次级分类下的商品
const getSubCategoryGoods = () => {
  loading.value = true
  params.id = route.params.id
  findSubCategoryGoodsAPI(params).then(({ result }) => {
    if (result.items.length) {
      goodsList.value.push(...result.items)
      params.page++
    } else {
      finished.value = true
    }
    loading.value = false
  }) 
}
 // 次级分类更改，重新加载数据
 watch(() => route.params.id, 
       (newVal) => {
                      if (newVal && `/category/sub/${newVal}` === route.path) {
                        finished.value = false
                        params = {
                          page: 1,
                          pageSize: 20
                        }
                        goodsList.value = [] // 列表置空，触发无限加载
                      }
                    }, 
        { immediate: true })
// 过滤条件更改，重新加载数据
const filterChange = (filterParams) => {
  finished.value = false
  params = { ...params, ...filterParams }
  params.page = 1
  goodsList.value = []
  getSubCategoryGoods()
}
// 排序条件更改，重新加载数据
const sortChange = (sortParams) => {
  finished.value = false
  params = { ...params, ...sortParams }
  params.page = 1
  goodsList.value = []
  getSubCategoryGoods()
}
</script>



<template>
  <AppHeaderSticky />  <!-- 吸顶组件 -->
  <div class="sub-category">
    <div class="container">
      <SubCrumb />   <!-- 面包屑 -->
      <SubFilter @filter-change="filterChange"/>   <!-- 筛选区 -->
      <!-- 商品面板（排序+列表） -->
      <div class="goods-list">
        <SubSort @sort-change="sortChange" />
        <ul>
          <li v-for="goods in goodsList" :key="goods.id" >
            <AppGoodsItem :goods="goods" />
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <AppInfiniteLoad :loading="loading" :finished="finished" @infinite="getSubCategoryGoods" />
      </div>
    </div>
  </div>
</template>



<style scoped lang="scss">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>