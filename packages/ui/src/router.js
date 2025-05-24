import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Account from './pages/Account.vue'
import Organizations from './pages/Organizations.vue'
import Auth from "./pages/Auth.vue";
import CheckCreation from "./pages/CheckCreation.vue";
import CheckDetail from "./pages/CheckDetail.vue";

const routes = [
    { path: '/', component: Home, meta: { requiresAuth: true } },
    { path: '/auth', component: Auth },
    { path: '/account', component: Account, meta: { requiresAuth: true } },
    { path: '/organizations', component: Organizations, meta: { requiresAuth: true } },
    { path: '/check/:checkId', component: CheckDetail, meta: { requiresAuth: true } },
    { path: '/check-creation', component: CheckCreation, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router =  createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('user-token');
    const isAuthenticated = !!token;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ path: '/auth' });
    } else {
        next();
    }
});

export default router;
