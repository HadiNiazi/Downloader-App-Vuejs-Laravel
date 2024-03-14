import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import Register from '../components/Auth/Register.vue';
import Login from '../components/Auth/Login.vue';
import NotFound from '../components/Errors/404.vue';
import Dashboard from '../components/Dashboard.vue';
import store from '../store/index.js';
import Uploads from '../components/Files/Upload.vue';
import Downloads from '../components/Files/Download.vue';

const routes = [

    {
        path: '/:any',
        name: 'notfound',
        component: NotFound
    },

    {
        path: '/',
        name: 'home',
        component: Home
    },

    {
        path: '/register',
        name: 'register',
        component: Register
    },

    {
        path: '/login',
        name: 'login',
        component: Login
    },

    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/uploads',
        name: 'uploads',
        component: Uploads,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/downloads',
        name: 'downloads',
        component: Downloads,
        meta: {
            requiresAuth: true
        }
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active'
});


router.beforeEach((to, from, next) => {

    const isAuthenticated = store.getters.authStatus

    if (to.meta.requiresAuth && !isAuthenticated) {
        // next('/login')
    }

    else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
        next('/dashboard')
    }

    else {
        next()
    }

});


export default router;
