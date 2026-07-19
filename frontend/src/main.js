import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { useSettingsStore } from './stores/settings'
import './assets/styles/main.css'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)

// Apply theme before mount to avoid flash
const settings = useSettingsStore()
settings.load()
settings.watchSystemTheme()

app.mount('#app')
