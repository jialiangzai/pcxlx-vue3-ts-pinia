import { request } from '@/utils/request'

//用户列表
export let rolePage = function (data) {
  return request({
    url: '/system/user/page',
    params: data,
  })
}

//删除用户
export let deleteUser = function (data: String) {
  return request({
    url: `/system/user/delete/${data}`,
  })
}

//全部岗位
export let postAll = function () {
  return request({
    url: '/system/post/all',
  })
}

//机构树
export let unitTree = function () {
  return request({
    url: '/system/unit/tree',
  })
}

//全部角色
export let roleAll = function () {
  return request({
    url: '/system/role/all',
  })
}

//添加用户
export let addUser = function (data) {
  return request({
    url: '/system/user/add',
    method: 'POST',
    data,
  })
}
