import { ref } from 'vue'
import { defineStore } from 'pinia'
import { findAllCategoryAPI } from '@/api/home'
import { TOP_CATEGORY } from '@/constants/category.js'

export const useCategoryStore = defineStore('category', () => {
  // 顶级分类列表：根据常量生成默认的顶级分类列表，避免网卡出现空白
  const categoryList = ref(Object.keys(TOP_CATEGORY).map(key => ({ name: TOP_CATEGORY[key].desc })))
  // 获取顶级分类列表
  const getCategoryList = async () => {
    const data = await findAllCategoryAPI()
    // 给每个顶级分类加上控制二级分类显示隐藏的参数
    data.result.forEach(top => {
      top.open = false
    })
    categoryList.value = data.result
  }
  // show和hide函数，控制当前分类的二级分类显示和隐藏
  const show = (id) => {
    const currentCategory = categoryList.value.find(item => id === item.id)
    currentCategory.open = true
  }
  const hide = (id) => {
    const currentCategory = categoryList.value.find(item => id === item.id)
    currentCategory.open = false
  }

  return {
    categoryList,
    getCategoryList,
    show,
    hide
  }
}, { persist: true })