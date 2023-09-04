const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    name: 'layout',
    redirect: 'dashboad',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/', // 空或和父路由路径一样会被默认加载
        name: 'dashboad', // 权限的标识
        component: () => import('@/views/dashboad/index.vue'),
        // 配置左侧菜单信息
      },
    ],
  },
  {
    path: '/system',
    name: 'system',
    redirect: 'role',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'role', // 空或和父路由路径一样会被默认加载
        name: '角色管理', // 权限的标识
        component: () => import('@/views/SystemRole/index.vue'),
        // 配置左侧菜单信息
        meta: {},
      },
      {
        path: 'user', // 空或和父路由路径一样会被默认加载
        name: '用户管理', // 权限的标识
        component: () => import('@/views/SystemUser/index.vue'),
        // 配置左侧菜单信息
      },
    ],
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/dashboad',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/', // 空或和父路由路径一样会被默认加载
        name: 'dashboad', // 权限的标识
        component: () => import('@/views/dashboad/index.vue'),
        // 配置左侧菜单信息
        meta: {
          title: '首页', // 菜单名字
          icon: 'dashboard', // 菜单图标
        },
      },
    ],
  },
]
export default routes
