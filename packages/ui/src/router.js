import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Account from './pages/Account.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/account', component: Account },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
