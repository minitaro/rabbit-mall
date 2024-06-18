import { computed, onUnmounted, ref} from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
  // 计时器
  let timer = null
  // 倒计时
  const time = ref(0)
  // 格式化倒计时
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
  // 开启倒计时
  const start = (currentTime) => {
    time.value = currentTime
    timer = setInterval(() => time.value--, 1000)
  }
  onUnmounted(() => {
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}