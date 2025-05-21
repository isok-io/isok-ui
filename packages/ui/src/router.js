import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Account from './pages/Account.vue'
import Organizations from './pages/Organizations.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/account', component: Account },
    { path: '/organizations', component: Organizations }
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
