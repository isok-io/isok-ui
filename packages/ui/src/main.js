import { createApp } from 'vue'
import '@components-lit/../styles/light-theme.css'
import '@components-lit/../styles/dark-theme.css'
import '@components-lit/../styles/global.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

