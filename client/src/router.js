import Vue from 'vue'
import Router from 'vue-router'
import Wrapper from './Wrapper'

Vue.use(Router)


import axios from "axios";

function isIModuleHasPermissions(userPermissions, role) {
    for (var key in userPermissions) {
        if (userPermissions[key] === role) {
            return true;
        }
    }
    return false;
}

import store from './store/store.js'


function routerGuard(to, from, next) {


    axios.get('/auth/user')
    .then((response) => {
        if (response.data.success) {
            let user = response.data.data;
            if (user) {
                if (user.status === 0) {
                    return next('/login');
                }
                if (to.meta.role) {
                    if (isIModuleHasPermissions(user.role.permissions, to.meta.role)) {
                        return next();
                    }
                    return next('/notAuthorized')
                } else {
                    return next();
                }
            }
        }
    })

}





const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/login',
            name: 'login',
            component: () => import('./views/pages/Login.vue'),
        },
        {
            path: '/forgotPassword',
            name: 'forgotPassword',
            component: () => import('./views/pages/forgotPassword.vue'),
        },

        {
            path: '/',
            component: Wrapper,
            beforeEnter: routerGuard,
            redirect: '/',
            children: [{
                    path: '',
                    name: 'dashboard',
                    component: () => import('./views/dashboard/Dashboard'),
                    beforeEnter: routerGuard,
                },
                {
                    path: '/users',
                    name: 'users',
                    component: () => import('./views/users/Users.vue'),
                    meta: {
                        role: 'user.view'
                    },
                    beforeEnter: routerGuard,
                },
                {
                    path: '/userForm/:id?',
                    name: 'userForm',
                    props: true,
                    component: () => import('./views/users/Form.vue'),
                    meta: {
                        role: 'user.update'
                    },
                    beforeEnter: routerGuard,
                },
                {
                    path: '/groups',
                    name: 'groups',
                    component: () => import('./views/groups/Groups.vue'),
                    meta: {
                        role: 'role.view'
                    },
                    beforeEnter: routerGuard,
                },
                {
                    path: '/groupForm/:id?',
                    name: 'groupForm',
                    component: () => import('./views/groups/Form.vue'),
                    meta: {
                        role: 'role.update'
                    },
                    beforeEnter: routerGuard,
                },
                {
                    path: '/media',
                    name: 'media',
                    component: () => import('./views/media/Media.vue'),
                    meta: {
                        role: 'media.view'
                    },
                    beforeEnter: routerGuard,
                },
                {
                    path: '/articles',
                    name: 'articles',
                    component: () => import('./views/articles/Articles.vue'),
                    meta: {
                        role: 'article.view'
                    },
                    beforeEnter: routerGuard,
                },
                {
                    path: '/articleForm',
                    name: 'articleForm',
                    component: () => import('./views/articles/Form.vue'),
                    meta: {
                        role: 'article.update'
                    },
                    beforeEnter: routerGuard,
                },
                {
                    path: '/categories',
                    name: 'categories',
                    component: () => import('./views/categories/Categories.vue'),
                    meta: {
                        role: 'category.view'
                    },
                    beforeEnter: routerGuard,
                },
                {
                    path: '/categoryForm/:id?',
                    name: 'categoryForm',
                    component: () => import('./views/categories/Form.vue'),
                    meta: {
                        role: 'category.update'
                    },
                    beforeEnter: routerGuard,
                },
                {
                    path: '/tags',
                    name: 'tags',
                    component: () => import('./views/tags/Tags.vue'),
                    meta: {
                        role: 'tag.view'
                    },
                    beforeEnter: routerGuard,
                },
                {
                    path: '/tagForm/:id?',
                    name: 'tagForm',
                    component: () => import('./views/tags/Form.vue'),
                    meta: {
                        role: 'tag.update'
                    },
                    beforeEnter: routerGuard,
                },

                {
                    path: '/notAuthorized',
                    name: 'notAuthorized',
                    component: () => import('./views/pages/NotAuthorized.vue'),
                },

            ]
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }

    }
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');
    if (to.path == '/login' && loggedIn) {
        router.push({ path: '/' })
    }
    if (authRequired && !loggedIn) {
        return next({
            path: '/login',
            query: { returnUrl: to.path }
        });
    }

    next();
  })




export default router;
