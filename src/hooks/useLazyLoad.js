import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

/**
 * @description: 数据懒加载
 * @param {Element} target - 被监测的Dom对象
 * @param {Function} API - 待调用的API函数
 * @author TMC
 * @date 2023-05-13 20:06:28
 */
export const useLazyLoad = (API) => {
  const result = ref([])
  const target = ref(null)
  const { stop } = useIntersectionObserver(
    // 监听的目标元素
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // isIntersecting:true 进入可视区，停止观察
        stop()
        // 调用API函数获取数据
        API().then(data => {
          result.value = data.result
        })
      }
    },
    // 配置选项，相交的比例大于0就触发
    {
      threshold: 0
    }
  )
  return { result, target }
}