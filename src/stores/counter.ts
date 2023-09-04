import { defineStore } from 'pinia'
import { getInfo } from '@/utils/api/login'
import menuStore from './menu'
const useStore = defineStore('counter', {
  state: () => {
    return {
      token: localStorage.getItem('token') || '',
      userInfo: null,
      permissions: null,
      units: null, //机构信息
      roles: [],
      currentRolePerm: '', //角色权限编码
    }
  },
  // 相当于组件中的methods，他们可以使用defineStore()中的actions属性定义，并且它们非常适合定义业务逻辑
  actions: {
    setToken(payload) {
      this.token = payload
    },
    async getUserInfo() {
      let { data } = await getInfo()
      const { permissions, roles, units, userInfo } = data
      this.permissions = permissions
      this.roles = roles
      this.units = units
      this.userInfo = userInfo
      if (!this.currentRolePerm) {
        this.currentRolePerm = roles[0]!.rolePerm
        sessionStorage.setItem('currentRolePerm', this.currentRolePerm)
      }
      await menuStore().loadAuthRouters()
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user', //设置存储的key
        storage: localStorage,
      },
    ],
  },
})
export default useStore
