// 负责把data中的成员/以及深层成员转换成响应式数据

function Observer (data) {
  // data --> vm.$data
  // 开始转换
  this.walk(data)
}

Observer.prototype = {
  constructor: Observer,
  // 遍历data调用defineReactive
  walk (data) {
    // 判断 data 是否是对象
    if (!data || typeof data !== 'object') {
      return
    }
    
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  },
  // 把属性设置为响应式数据
  defineReactive (data, key, value) {
    // 记录当前的this
    const that = this
    this.walk(value)
    // 属性的监听器
    const dep = new Dep()
    Object.defineProperty(data, key, {
      // 属性描述符
      configurable: false,
      enumerable: true,
      get () {
        // 当触发 get 的时候
        // 把watcher添加到属性的监听器中 subs
        Dep.target && dep.addSub(Dep.target)
        return value
      },
      set (newValue) {
        if (value === newValue) {
          return
        }
        // 在设置值的时候，如果newValue 是对象，设置为响应式数据
        that.walk(newValue)
        value = newValue

        // 数据变化，通知订阅者，数据发生变化要去更新视图
        dep.notify()

        // dep.addSub(watcher)
      }
    })
  }
}
