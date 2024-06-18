import { defineStore } from 'pinia';
import { ref } from 'vue'
import { userAccountLoginAPI } from '@/api/user.js'
import { mergeCartAPI } from '@/api/cart.js'
import { useCartStore } from  '@/stores/cart.js'

export const useUserStore = defineStore('user', () => {

  // 用户购物车信息
  const cartStore = useCartStore()
  // 用户登录信息
  const userInfo = ref({})

  // 用户登录
  const userAccountLogin = async ({ account, password }) => {
    // 获取用户信息
    const data = await userAccountLoginAPI({ account, password})
    userInfo.value = data.result
    // 更新购物车信息
    if (cartStore.cartList.length > 0) {
      await mergeCartAPI(cartStore.cartList.map(item => ({
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      })))
    }
    cartStore.findCartList()
  }

  // 用户登出
  const userLogout = () => {
    userInfo.value = {}   // 清空用户信息
    cartStore.clearCart() // 清空购物车
  }

  return {
    userInfo,
    userAccountLogin,
    userLogout
  }

}, { persist: true })