import useStore from '@/stores/counter'
export const auth = {
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {
    let isP = useStore().permissions
    //  指令绑定的value
    let value = binding.value
    if (!value) {
      throw new Error('指令要输入参数')
    }
    if (isP && isP.length > 0) {
      // 超管
      if (isP.includes('*:*:*')) return
      // 匹配得到
      if (isP.includes(value)) return
      // 无权限 不显示 可以用父元素删除 或者 父节点
      el.remove()
    }
  },
}
