import Vue from 'vue'
import Router from 'vue-router'
import Wrapper from './Wrapper'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/pages/Login.vue'),
    },
    {
      path: '/',
      component: Wrapper,
      meta: {requiresAuth: true},
      redirect: '/',
      children:[
        {
          path: '',
          name: 'dashboard',
          component: () => import('./views/dashboard/Dashboard'),
          meta: {requiresAuth: true},
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('./views/users/Users.vue'),
          meta: {requiresAuth: true},
        },
        {
          path: '/addNewUser',
          name: 'addNewUser',
          component: () => import('./views/users/Form.vue'),
          meta: {requiresAuth: true},
        },
        {
          path: '/groups',
          name: 'groups',
          component: () => import('./views/groups/Groups.vue'),
          meta: {requiresAuth: true},
        },
        {
          path: '/groupForm',
          name: 'groupForm',
          component: () => import('./views/groups/Form.vue'),
          meta: {requiresAuth: true},
        },
        {
          path: '/media',
          name: 'media',
          component: () => import('./views/media/Media.vue'),
          meta: {requiresAuth: true},
        },
        {
          path: '/articles',
          name: 'articles',
          component: () => import('./views/articles/Articles.vue'),
          meta: {requiresAuth: true},
        },
        {
          path: '/articleForm',
          name: 'articleForm',
          component: () => import('./views/articles/Form.vue'),
          meta: {requiresAuth: true},
        },
        
        
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
    
  }
})


router.beforeEach((to, from, next) => {
	const token = localStorage.getItem('token');
	if (to.meta.requiresAuth) {
		if (token) {
			next()
		} else {
			next({ name: 'login' })
		}
	} else {
		next();
	}
});	

export default router;