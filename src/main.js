import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from '@/stores/index.js'
import 'normalize.css'
import '@/assets/styles/common.scss'
import directives from '@/directives/index.js'
import components from '@/components/index.js'
import '@/mock/collect.js'


const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(directives)
app.use(components)
app.mount('#app')
