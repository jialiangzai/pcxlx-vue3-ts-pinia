import router from './index'
import menuStore from '../stores/menu'
import { ElMessage } from 'element-plus'
import useStore from '@/stores/counter'
router.beforeEach(async (to, from, next) => {
  let { token, userInfo, permissions, roles, getUserInfo } = useStore()
  let { authLideMenuMap } = menuStore()
  /**
   * 有token——访问login——跳到首页       访问其他的页面放行——有无用户信息  无：发请求获取用户信息拿到有权限可访问的路由追加
   * 无token——是否白名单——放行/去登陆页
   */
  if (token) {
    if (to.path == '/login') {
      next('/')
    } else {
      next()
      if (!userInfo) {
        await getUserInfo()
      } else {
        if (!authLideMenuMap.hasOwnProperty(to.path)) {
          // 这里可以再更新一下确定最新的动态路由
          ElMessage.error('没有此权限')
        }
      }
      next('/')
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
