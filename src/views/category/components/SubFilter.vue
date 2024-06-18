<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilterAPI } from '@/api/category.js'

const emit = defineEmits(['filterChange'])
const route = useRoute()
const filterData = ref(null)     // 过滤参数
const filterLoading = ref(false) // 过滤参数加载 
// 次级分类变化，重新加载过滤条件
watch(() => route.params.id, (newVal) => {
  if (newVal && `/category/sub/${newVal}` === route.path) {
    filterLoading.value = true
    findSubCategoryFilterAPI(route.params.id).then(({ result }) => {
       // 1. 品牌
       result.selectedBrandId = null
       result.brands.unshift({ id: null, name: '全部' })
       // 2. 属性
       result.saleProperties.forEach(item => {
         item.selectedPropId = null
         item.properties.unshift({ id: null, name: '全部' })
       })
       filterData.value = result
       filterLoading.value = false
    })
  }
}, { immediate: true})

// 改变品牌过滤参数
const brandChange = (brandId) => {
  if (filterData.value.selectedBrandId === brandId) return
  filterData.value.selectedBrandId = brandId
  emit('filterChange', getFilterParams())
}
// 改变销售属性过滤参数
const propChange = (item, propId) => {
  if (item.selectedPropId === propId) return
  item.selectedPropId = propId
  emit('filterChange', getFilterParams())
}
// 获取过滤参数：{brandId:'',attrs:[{groupName:'',propertyName:''},...]}
const getFilterParams = () => {
  let filterParams = { brandId: null, attrs: [] }
  // 品牌
  filterParams.brandId = filterData.value.selectedBrandId
  // 销售属性
  filterData.value.saleProperties.forEach(item => {
    if (item.selectedPropId) {
      const prop = item.properties.find(prop => prop.id === item.selectedPropId)
      filterParams.attrs.push({ groupName: item.name, propertyName: prop.name })
    }
  })
  if (filterParams.attrs.length === 0) filterParams.attrs = null
  return filterParams
}
</script>

<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a v-for="brand in filterData.brands" :key="brand.id"
           class="ellipsis" :class="{ active: brand.id === filterData.selectedBrandId }"     
          :title="brand.name" 
          @click="brandChange(brand.id)" href="javascript:;">
          {{ brand.name }}
        </a>
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}: </div>
      <div class="body">
        <a v-for="prop in item.properties" :key="prop.id"
           class="ellipsis" :class="{ active: prop.id === item.selectedPropId }" 
          :title="prop.name" 
          @click="propChange(item, prop.id)" href="javascript:;">
          {{ prop.name }}
        </a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <AppSkeleton class="item" width="800px" height="40px"  />
    <AppSkeleton class="item" width="800px" height="40px"  />
    <AppSkeleton class="item" width="600px" height="40px"  />
    <AppSkeleton class="item" width="600px" height="40px"  />
    <AppSkeleton class="item" width="600px" height="40px"  />
  </div>
</template>

<style scoped lang="scss">
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    .head {
      width: 80px;
      color: #999;
      line-height: 40px;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all .3s;
        display: inline-block;
        max-width: 112px;
        line-height: 40px;
        &.active,
        &:hover {
          color: $xtxColor;
        }
      }
    }
  }
  .app-skeleton {
    padding: 10px 0;
  }
}
</style>