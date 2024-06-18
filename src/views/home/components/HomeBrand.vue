<script setup>
import { ref } from 'vue'
import { useLazyLoad } from '@/hooks/useLazyLoad.js'
import { findBrandAPI } from '@/api/home';
import HomePanel from './HomePanel.vue';

const { target, result } = useLazyLoad(findBrandAPI)
const brandList = ref(result)
// 页码，前提只有 0 1 两页
const index = ref(0)
// 页码切换
const toggle = (step) => {
  const newIndex = index.value + step
  if (newIndex < 0 || newIndex > 1) return
  index.value = newIndex
}
</script>

<template>
  <HomePanel title="热门品牌" subtitle="国际经典 品质保证">
    <template #right>
      <a class="iconfont icon-angle-left prev" 
        :class="{ disabled: index === 0 }" 
        @click="toggle(-1)" href="javascript:;" />
      <a class="iconfont icon-angle-right next"
        :class="{ disabled: index === 1 }" 
        @click="toggle(1)" href="javascript:;" />
    </template>
    <div ref="target" class="box">
      <Transition name="fade">
        <ul v-if="brandList.length" class="list" :style="{ transform: `translateX(${-index*1240}px)` }">
          <li v-for="item in brandList" :key="item.id">
            <RouterLink to="/">
              <img v-lazy-img="item.picture" alt="">
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <AppSkeleton class="item" v-for="i in 5" :key="i" animated bgColor="#e4e4e4" width="240px" height="305px"/>
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<style scoped lang="scss">
.home-panel {
  background:#f5f5f5
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: $xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>