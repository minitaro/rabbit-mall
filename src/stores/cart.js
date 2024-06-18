import { defineStore } from 'pinia';
import { computed, ref } from 'vue'
import { addToCartAPI, findCartListAPI, deleteFromCartAPI, updateCartAPI, allCheckCartAPI } from '@/api/cart';
import { useUserStore } from './user.js'

export const useCartStore = defineStore('cart', () => {

  // 用户登录信息
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.token)


  // 购物车清单
  const cartList = ref([])


  // 有效商品清单：库存stock>0；商品有效标识isEffective=true  
  const validList = computed(() => cartList.value.filter(goods => goods.stock > 0 && goods.isEffective))


   // 有效商品总件数
  const validTotalCount = computed(() => validList.value.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0))


  // 有效商品总金额
  const validTotalPrice = computed(() => validList.value.reduce((accumulator, currentValue) => accumulator + Math.round(currentValue.price * 100) * currentValue.count, 0) / 100)


  // 已选有效商品清单
  const selectedList = computed(() => validList.value.filter(goods => goods.selected))


  // 已选有效商品总件数
  const selectedTotalCount = computed(() => selectedList.value.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0))


  // 已选有效商品总金额
  const selectedTotalPrice = computed(() => selectedList.value.reduce((accumulator, currentValue) => accumulator + Math.round(currentValue.price * 100) * currentValue.count, 0) / 100)


  // 无效商品清单 
  const invalidList = computed(() => cartList.value.filter(goods => goods.stock <= 0 || !goods.isEffective))


  // 是否全选
  const isAllSelected = computed(() => validList.value.length > 0 && validList.value.length === selectedList.value.length)


  // --------------------------------------------------------------
  // 查询购物车
  const findCartList = async () => {
    const data = await findCartListAPI()
    cartList.value = data.result
  }


  // 添加商品到购物车
  const addToCart = async (goods) => {
    const { skuId, count } = goods
    if (isLogin.value) {
      await addToCartAPI({ skuId, count })
      findCartList()
    } else {
      const item = cartList.value.find(item => item.skuId === goods.skuId)
      if (item) {
        item.count += goods.count
      } else {
        cartList.value.push(goods)
      }
    }
  }


  // 删除购物车商品
  const deleteFromCart = async (skuId) => {
    if (isLogin.value) {
      await deleteFromCartAPI([skuId])
      findCartList()
    } else {
      const index = cartList.value.findIndex(item => item.skuId === skuId)
      cartList.value.splice(index, 1)
    }
  }


  // 批量删除购物车商品
  const batchDeleteFromCart = async () => {
    const ids = selectedList.value.map(item => item.skuId)
    if (isLogin.value) {
      await deleteFromCartAPI(ids)
      findCartList()
    } else {
      ids.forEach(id => deleteFromCart(id))
    }
  }


  // 清空购物车
  const clearCart = () => cartList.value = []


  // 商品数量变化
  const countChange = async (skuId, count) => {
    if (isLogin.value) {
      await updateCartAPI({ skuId, count })
      findCartList() 
    }
  }


  // 单选功能
  const singleCheck = async (skuId, selected) => {
    if (isLogin.value) {
      await updateCartAPI({ skuId, selected })
      findCartList()
    } else {
      const item = validList.value.find(item => item.skuId === skuId)
      item.selected = selected
    }
  }


  // 全选功能
  const allCheck = async (selected) => {
    if (isLogin.value) {
      const ids = validList.value.map(item => item.skuId)
      await allCheckCartAPI({ selected, ids})
      findCartList()
    } else {
      validList.value.forEach(item => item.selected = selected)
    }
  }

 
  return {
    isLogin,
    cartList,
    validList,
    validTotalCount,
    validTotalPrice,
    selectedList,
    selectedTotalCount,
    selectedTotalPrice,
    invalidList,
    isAllSelected,
    findCartList,
    addToCart,
    deleteFromCart,
    batchDeleteFromCart,
    clearCart,
    countChange,
    singleCheck,
    allCheck
  }
}, { persist: true })