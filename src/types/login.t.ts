//登录
export interface RuleForm {
  username: string
  password: string
  key: string
  captcha: string
  isReme: boolean
}

type To = {
  id: number
  content: string
  done: boolean
}
type Res<T> = {
  code: number
  msg: string
  result: T
}
const res: Res<To[]> = {
  code: 200,
  msg: '成功',
  result: [
    { id: 1, content: '吃饭', done: false },
    { id: 2, content: '睡觉', done: true },
  ],
}
