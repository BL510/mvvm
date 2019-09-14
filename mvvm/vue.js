function Vue (options) {
  this.$options = options || {}
  // #app --> DOM 对象
  this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
  this.$data = options.data || {}

  // 把 data 中的成员注入 Vue 实例的第一层属性
  this._proxyData()
  // 数据劫持：把data中的所有成员转换成setter / getter

  // 编译模板
  new Compiler(this)
}

// 把data中的第一层属性注入到 Vue 实例上
Vue.prototype._proxyData = function () {
  // 遍历 data 中的第一层属性
  Object.keys(this.$data).forEach(key => {
    // 把属性转换成 getter/setter
    Object.defineProperty(this, key, {
      // 属性描述符
      configurable: false,
      enumerable: true,
      get () {
        return this.$data[key]
      },
      set (value) {
        // 如果设置的值和data中现有的值相同，不做任何处理
        if (value === this.$data[key]) {
          return
        }
        this.$data[key] = value
      }
    })
  })
}
