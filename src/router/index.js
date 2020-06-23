import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/log',
    component: Layout,
    redirect: '/sys/log',
    name: 'logManage',
    meta: { title: '系统', icon: 'example' },
    children: [
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/sys/log/log-list'),
        meta: { title: '日志', icon: 'table' }
      },
      {
        path: 'music',
        name: 'Music',
        component: () => import('@/views/sys/music/music-list'),
        meta: { title: '音乐', icon: 'table' }
      },
      {
        path: 'link',
        name: 'Link',
        component: () => import('@/views/sys/link/link-list'),
        meta: { title: '链接', icon: 'table' }
      }
    ]
  },
  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/blog',
    name: 'blogManage',
    meta: { title: '博客', icon: 'example' },
    children: [
      {
        path: 'type',
        name: 'Type',
        component: () => import('@/views/blog/type/type-list'),
        meta: { title: '分类管理', icon: 'table' }
      },
      {
        path: 'blog',
        name: 'Blog',
        component: () => import('@/views/blog/blog/blog-list'),
        meta: { title: '博客管理', icon: 'table' }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/blog/about/about-list'),
        meta: { title: '关于我的', icon: 'table' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/user',
    name: 'userManage',
    meta: { title: '用户', icon: 'example' },
    children: [
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/user/admin/admin-update'),
        meta: { title: '管理员', icon: 'table' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/user/user-list'),
        meta: { title: '用户', icon: 'user' }
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
