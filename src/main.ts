import { createApp } from 'vue'
import App from './App.vue'

import './assets/index.css'

import '@material/web/all'
import 'material-symbols'

import { Router } from './router/Index'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const instance = createApp(App)
instance.use(pinia).use(Router).mount('#app')
