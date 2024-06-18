
<script setup>
defineProps(
  {
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    },
    bgColor: {
      type: String,
      default: '#efefef'
    },
    animated: {
      type: Boolean,
      default: false
    }
  }
)
</script>

<template>
  <div class="app-skeleton" :style="{ width, height }" :class="{ flicker: animated }">
    <div class="block" :style="{ backgroundColor: bgColor }"></div>
  </div>
</template>

<style scoped lang="scss">
.app-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    border-radius: 2px;
  }
}
.flicker {
  &::after {
    content: "";
    position: absolute;
    animation: flicker 1.5s ease 0s infinite;
    top: 0;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-45deg);
  }
}
@keyframes flicker {
  0% {
    left: -100%;
  }
  100% {
    left: 120%;
  }
}
</style>