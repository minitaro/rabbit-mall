import { useIntersectionObserver } from '@vueuse/core'
import defaultImg from '@/assets/images/200.png'

// 定义图片懒加载指令
export const lazyImg = {
  mounted (el, binding) {
    // el: 指令绑定的那个元素 img
    // binding: binding.value  指令等于号后面绑定的表达式的值  图片url
    const { stop } = useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          stop()                 // 停止检测
          el.src = binding.value // 加载图片
          el.onerror = () => {
            el.src = defaultImg  // 加载失败，使用默认图
          }
        }
      },
      {
        threshold: 0
      }
    )
  }
}