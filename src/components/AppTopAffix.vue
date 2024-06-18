<script setup>
import { useWindowScroll  } from '@vueuse/core'

const { y } = useWindowScroll()
</script>

<template>
  <div class="app-top-affix" :class="{ show: y >= 78 }">
    <div class="container" v-show="y >= 78">
      <slot></slot>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-top-affix {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 20px;
    border-left: 2px solid $xtxColor;
  }
}
</style>