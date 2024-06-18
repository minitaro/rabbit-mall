<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['checkChange'])
const checked = useVModel(props, 'modelValue', emit)
const checkChange = () => {
  const newVal = !checked.value
  checked.value = newVal
  emit('checkChange', newVal)
}
</script>



<template>
  <div class="app-checkbox" @click="checkChange">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>



<style scoped lang="scss">
.app-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: $xtxColor;
    ~ span {
      color: $xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>