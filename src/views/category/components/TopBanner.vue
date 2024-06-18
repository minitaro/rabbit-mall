<script setup>
import { ref, onMounted } from 'vue'
import { findBannerAPI } from '@/api/home.js'

const bannerList = ref([])
onMounted(() => findBannerAPI().then(data => bannerList.value = data.result))
</script>



<template>
  <div ref="target" class="top-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img v-lazy-img="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang="scss">
.top-banner {
  width: 100%;
  height: 500px;
  position: relative;
  img {
    width: 100%;
    height: 500px;
  }
}
</style>