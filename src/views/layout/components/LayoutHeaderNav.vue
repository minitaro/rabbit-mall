<script setup>
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category.js'

const categoryStore = useCategoryStore()
onMounted(() => categoryStore.getCategoryList())
</script>



<template>
  <ul class="layout-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li v-for="top in categoryStore.categoryList" 
        :key="top.id"
        :class="{ active: top.id && $route.params.id === top.id }"
        @mouseenter="categoryStore.show(top.id)"
        @mouseleave="categoryStore.hide(top.id)"
        >
      <RouterLink @click="categoryStore.hide(top.id)" :to="`/category/${ top.id }`">{{ top.name }}</RouterLink>
      <div class="layer" :class="{ open: top.open }">
        <ul>
          <li v-for="sub in top.children" :key="sub.id">
            <RouterLink @click="categoryStore.hide(top.id)" :to="`/category/sub/${ sub.id }`">
              <img v-lazy-img="sub.picture" alt="">
              <p>{{ sub.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>



<style scoped lang="scss">
.layout-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 999;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover,&.active {
      > a {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }
}
.layer {
  &.open {
    display: block;
    height: 132px;
  }
  display: none;
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 32px;
  height: 0;
  overflow: hidden;
  box-shadow: 0 0 5px #ccc;
  transition: all .2s .1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: $xtxColor;
        }
      }
    }
  }
}
</style>