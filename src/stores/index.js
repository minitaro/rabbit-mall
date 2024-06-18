import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建pinia实例并引入持久化插件
export const pinia = createPinia().use(piniaPluginPersistedstate)