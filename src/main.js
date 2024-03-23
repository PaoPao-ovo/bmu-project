import '@/assets/js/flexible.js'
import '@/assets/css/main.css'
import pinia from './stores'
import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import 'default-passive-events'
import router from './router'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(pinia)
app.use(router)
app.mount('#app')
