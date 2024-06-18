<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findTopCategoryAPI } from '@/api/category';

const route = useRoute()
// 顶级分类下的二级类目列表
const subList = ref([])
// 路由变化且在顶级类名下才发请求
watch(() => route.params.id, 
      (newVal) => {      
                    if (newVal && `/category/${newVal}` === route.path) 
                    findTopCategoryAPI(route.params.id).then(data => {
                      subList.value = data.result.children
                    })
                  }, 
      { immediate: true })
</script>



<template>
  <div class="ref-goods" v-for="sub in subList" :key="sub.id">
    <div class="head">
      <h3>- {{ sub.name }}-</h3>
      <p class="tag">热门推荐，品质之选</p>
      <AppMore :path="`/category/sub/${sub.id}`"/>
    </div>
    <div class="body">
      <AppGoodsItem v-for="goods in sub.goods" :goods="goods" :key="goods.id" />
    </div>
  </div>
</template>



<style scoped lang="scss">
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .app-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: space-around;
    padding: 0 40px 30px;
  }
}
</style>