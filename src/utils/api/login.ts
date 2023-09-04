import { request } from '@/utils/request'

export function captchaImg(params: { key: string }) {
  return request({
    url: '/captcha/imageCode',
    params,
    responseType: 'arraybuffer',
  })
}
export function loginByJson(data: Object) {
  return request({
    url: '/u/loginByJson',
    data,
    method: 'post',
  })
}
export function getInfo() {
  return request({
    url: '/personal/getInfo',
    method: 'get',
  })
}
export function getRouters(data) {
  return request({
    url: `/personal/getRouters/${data}`,
  })
}
