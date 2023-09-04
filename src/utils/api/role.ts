import { request } from '@/utils/request'

export const captchaImg = (params) => {
  return request({
    url: '/system/role/page',
    params,
  })
}
//删除角色
export const roleDelete = function (data: String) {
  return request({
    url: `/system/role/delete/${data}`,
  })
}

//菜单权限分页
export const menuPage = function (data) {
  return request({
    url: '/system/menu/page',
    params: data,
  })
}

//添加角色
export const addRole = function (data) {
  return request({
    url: '/system/role/add',
    method: 'post',
    data,
  })
}

//角色详情
export const getRole = function (data: String) {
  return request({
    url: `/system/role/get/${data}`,
  })
}

//修改角色
export const updateRole = function (data) {
  return request({
    url: '/system/role/update',
    method: 'post',
    data,
  })
}
//字典项
export const ApiDictItemQueryBatch = function( data ){
  return request({
      url: "/system/dict/item/queryBatch",
      method: "POST",
      data
  })
}
