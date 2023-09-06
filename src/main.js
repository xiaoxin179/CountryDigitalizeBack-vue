import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import  piniaPluginPersistedstate  from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import 'element-plus/theme-chalk/index.css'
import ElementPlus from 'element-plus'
const app = createApp(App)
const pinia=createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(createPinia())
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
