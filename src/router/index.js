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
  // 首页  活动列表
  {
    path: '/',
    component: Layout,
    redirect: '/tables',
    children: [
      {
        path: 'index',
        component: () => import('@/views/modules/activity.vue'),
        // component: () => import('@/views/table/complex-table'),
        name: 'Icons',
        meta: { title: '活动列表', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/vip/score',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/modules/memberAccount.vue'),
        name: 'Star',
        meta: { title: '积分管理', icon: 'star', noCache: true }
      }
    ]
  },
  {
    path: '/user/shop',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/modules/product.vue'),
        name: 'Shopping',
        meta: { title: '积分商品', icon: 'shopping', noCache: true }
      }
    ]
  },
  {
    path: '/tables',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/modules/apply.vue'),
        name: 'Component',
        meta: { title: '报名列表', icon: 'component', noCache: true }
      }
    ]
  },

  {
    path: '/vip',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/modules/member.vue'),
        name: 'User',
        meta: { title: '用户管理', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/vip/s',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/modules/memberAccountLog.vue'),
        name: 'peoples',
        meta: { title: '会员账号记录', icon: 'peoples', noCache: true }
      }
    ]
  },
  {
    path: '/vip/token',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/modules/memberToken.vue'),
        name: 'People',
        meta: { title: '用户token管理', icon: 'people', noCache: true }
      }
    ]
  },
  {
    path: '/user/order',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/modules/order.vue'),
        name: 'Documentation',
        meta: { title: '订单管理', icon: 'documentation', noCache: true }
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
    path: '/table',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/table/complex-table'),
        name: 'Icons',
        meta: { title: '测试页面', icon: 'dashboard', noCache: true }
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
