import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // 首页
  {
    path: '/',
    component: Layout,
    redirect: '/tables',
    children: [
      {
        path: 'index',
        component: () => import('@/views/table/complex-table'),
        name: 'Icons',
        meta: { title: '活动编辑', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/tables',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/table/complex-table'),
        name: 'Icons',
        meta: { title: '活动编辑案例', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/Tinymce',
    component: Layout,
    children: [
      {
        path: 'Tinymce',
        component: () => import('@/views/tinymce/tinymce'),
        name: 'Tinymce',
        meta: { title: '富文本', noCache: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
