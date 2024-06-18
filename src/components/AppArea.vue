<script setup>
import { computed, reactive, ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
defineProps({
  fullLocation: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择配送地址'
  }
})
const emit = defineEmits(['addressChange'])

// 地址选项框是否可见
const visible = ref(false) 
// 是否正在加载数据
const loading = ref(false) 
// 地区数据
const areaData = ref([]) 
// 打开地址选项框
const open = () => {
  visible.value = true
  // 获取地区数据
  loading.value = true
  getAreaData().then(data => {
    areaData.value = data
    loading.value = false
  })
  // 清空之前的选择数据
  for (const key in selectedArea) {
    selectedArea[key] = ''
  }
}
// 关闭地址选项框
const close = () => visible.value = false
// 切换地址选项框显示隐藏状态
const toggle = () => visible.value ? close() : open() 

// 监控对象为整个组件AppArea
const target = ref(null) 
// 点击组件外部关闭地址选项框
onClickOutside(target, () => close()) 

// 获取省市区数据函数
const getAreaData = () => {
  // 数据：https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
  // 1. 当本地没有缓存，发请求获取数据
  // 2. 当本地有缓存，取出本地数据；约定：数据存储在window上的areaData字段
  // 返回promise在then获取数据，这里可能是异步操作可能是同步操作
  return new Promise((resolve) => {
    // 
    if (window.areaData) {
      resolve(window.areaData)
    } else {
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        window.cityData = res.data
        resolve(res.data)
      })
    }
  })
}

// 地址选项框显示的地区列表
const areaList = computed(() => {
  // 省一级
  let list = areaData.value
  // 省一级已选：市一级
  if (selectedArea.provinceCode && selectedArea.provinceName) {
    list = list.find(p => p.code === selectedArea.provinceCode).areaList
  }
  // 市一级已选：区一级
  if (selectedArea.cityCode && selectedArea.cityName) {
    list = list.find(c => c.code === selectedArea.cityCode).areaList
  }
  return list
})
// 选择的省市区数据
const selectedArea = reactive({
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  countyCode: '',
  countyName: '',
  fullLocation: ''
})
// 点击地址选项
const itemSelect = (item) => {
  // 省
  if (item.level === 0) {
    selectedArea.provinceCode = item.code
    selectedArea.provinceName = item.name
  }
  // 市
  if (item.level === 1) {
    selectedArea.cityCode = item.code
    selectedArea.cityName = item.name
  }
  // 区
  if (item.level === 2) {
    selectedArea.countyCode = item.code
    selectedArea.countyName = item.name
    // 完整地址
    selectedArea.fullLocation = `${selectedArea.provinceName} ${selectedArea.cityName} ${selectedArea.countyName}`
    close()
    emit('addressChange', selectedArea)
  }
}
</script>



<template>
  <div class="app-area" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <span v-if="!fullLocation" class="placeholder">{{ placeholder }}</span>
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <div v-if="loading" class="loading"></div>
      <template v-else>
        <span class="ellipsis" v-for="item in areaList" :key="item.code" @click="itemSelect(item)">{{item.name}}</span>
      </template>
    </div>
  </div>
</template>



<style scoped lang="scss">
.app-area {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    overflow: hidden;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 14px;
    }
    i {
      font-size: 14px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(@/assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>