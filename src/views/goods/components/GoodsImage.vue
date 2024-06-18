<script setup>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

// 图片列表
defineProps({
  imageList: {
    type: Array,
    default: () => [
      "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
      "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
      "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
      "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
      "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
    ]
  }
})

// 当前预览图的索引
const activeIndex = ref(0)
// 预览图切换
const activeChange = (index) => activeIndex.value = index


// 左侧标准图
const target = ref(null)
// 鼠标与左侧标准图的相对位置
const { elementX, elementY, isOutside } = useMouseInElement(target)
// 滑块位置：控制滑块跟随鼠标移动（监听elementX/Y变化，一旦变化 重新设置left/top）
const layerLeft = ref(0)
const layerTop = ref(0)
// 放大图显示位置
const positionX = ref(0)
const positionY = ref(0)

// 监控鼠标位置变化
watch([elementX, elementY, isOutside], () => {

  // 如果鼠标在左侧中图外面 直接返回
  if (isOutside.value) return

  // 有效范围内控制滑块距离
  // 横向
  if (elementX.value > 100 && elementX.value < 300) {
    layerLeft.value = elementX.value - 100
  }
  // 纵向
  if (elementY.value > 100 && elementY.value < 300) {
    layerTop.value = elementY.value - 100
  }

  // 处理边界
  // 横向
  if (elementX.value > 300) { layerLeft.value = 200 }
  if (elementX.value < 100) { layerLeft.value = 0 }
  // 纵向
  if (elementY.value > 300) { layerTop.value = 200 }
  if (elementY.value < 100) { layerTop.value = 0 }

  // 控制大图的显示
  positionX.value = -layerLeft.value * 2
  positionY.value = -layerTop.value * 2

})
</script>



<template>
  <div class="goods-image">
    <!-- 左侧标准图-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块/遮罩色块 -->
      <div class="layer" v-show="!isOutside" :style="{ left: `${layerLeft}px`, top: `${layerTop}px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i"  
          :class="{ active: i === activeIndex }"
          @mouseenter="activeChange(i)">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大图 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
</template>



<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
}
</style>