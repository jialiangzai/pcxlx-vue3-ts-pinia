import { defineStore } from 'pinia'
import { getRouters } from '@/utils/api/login'
import useStore from '@/stores/counter'
const menuStore = defineStore('menu', {
  state: () => {
    return {
      authSlideMenuList: '' as any, //整理的菜单数
      authLideMenuMap: {}, //扁平化后的数据结构[map格式]
    }
  },
  // 相当于组件中的methods，他们可以使用defineStore()中的actions属性定义，并且它们非常适合定义业务逻辑
  actions: {
    async loadAuthRouters() {
      let userstore = useStore()
      let { data } = await getRouters(userstore.currentRolePerm)
      // 数据扁平化
      let resMap = dataWith(data)
      this.authSlideMenuList = resMap.newList
      this.authLideMenuMap = resMap.obj
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'menu', //设置存储的key
        storage: localStorage,
      },
    ],
  },
})
function dataWith(routerList) {
  const authMap = new Map()
  // 添加首页
  const newList = [
    {
      path: '/',
      name: '首页',
    },
    ...routerList,
  ]
  // 递归处理数据
  let resListMap = deepData(newList, authMap)
  const obj = Object.fromEntries(resListMap)
  return { obj, newList }
}
function deepData(newList, mapObj) {
  newList.map((m) => {
    mapObj.set(m.path, m)
    if (m.children) {
      deepData(m.children, mapObj)
    }
  })
  return mapObj
}
export default menuStore
