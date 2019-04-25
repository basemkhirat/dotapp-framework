import Vue from 'vue'
import Router from 'vue-router'
import Wrapper from './Wrapper'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Wrapper,
      children:[
        {
          path: '',
          name: 'dashboard',
          component: () => import('./views/dashboard/Dashboard')
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('./views/users/Users.vue')
        },
        {
          path: '/addNewUser',
          name: 'addNewUser',
          component: () => import('./views/users/Form.vue')
        },
        {
          path: '/groups',
          name: 'groups',
          component: () => import('./views/groups/Groups.vue')
        },
        {
          path: '/groupForm',
          name: 'groupForm',
          component: () => import('./views/groups/Form.vue')
        },
        {
          path: '/media',
          name: 'media',
          component: () => import('./views/media/Media.vue')
        },
        {
          path: '/articles',
          name: 'articles',
          component: () => import('./views/articles/Articles.vue')
        },
        {
          path: '/articleForm',
          name: 'articleForm',
          component: () => import('./views/articles/Form.vue')
        },
        // {
        //   path: '/gallery',
        //   name: 'gallery',
        //   component: () => import('./views/gallery/Gallery'),
        //   children:[
        //     {
        //       path: '',
        //       name: 'media',
        //       component: () => import('./views/gallery/Media')
        //     },
        //     {
        //       path: '/gallery/albums',
        //       name: 'albums',
        //       component: () => import('./views/gallery/Albums')
        //     },
        //     {
        //       path: '/gallery/photos',
        //       name: 'photos',
        //       component: () => import('./views/gallery/Photos')
        //     },
        //     {
        //       path: '/gallery/videos',
        //       name: 'videos',
        //       component: () => import('./views/gallery/Videos')
        //     },
        //     {
        //       path: '/gallery/files',
        //       name: 'files',
        //       component: () => import('./views/gallery/Files')
        //     },
        //   ]
        // },
        // Gallery Components
        
      ]
    }
  ]
})
