<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  finished: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['infinite'])
const target = ref(null)
useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      // 触发加载事件条件：请求加载完成，数据加载完毕
      if (!props.loading && !props.finished) {
        emit('infinite')
      }
    }
  }, {
    threshold: 0
  }
)
</script>



<template>
  <div class="app-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>



<style scoped lang="scss">
.app-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(@/assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(@/assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>

