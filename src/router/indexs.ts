import { createRouter, createWebHistory } from 'vue-router'
import useStore from '../stores/counter'
import dashboad from '../views/dashboad/index.vue'
let useStores = useStore()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: dashboad,
    },
  ],
})
router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    document.title = '学鹿后台管理系统'
    return
  }
  if (!useStores.token) {
    return next('/login')
  }
  try {
    await useStores.getUserInfo()
    let per =
      useStores.userInfo!.permissions &&
      useStores.userInfo!.permissions[0] === '*:*:*'
    if (per) {
      return next()
    }
  } catch (error) {
    return next('/login')
  }
  next()
})
export default router
