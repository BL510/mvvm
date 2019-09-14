function Vue (options) {
  this.$options = options || {}
  // #app --> DOM 对象
  this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
  this.$data = options.data || {}

  // 把 data 中的成员注入 Vue 实例的第一层属性

  // 数据劫持：把data中的所有成员转换成setter / getter

  // 编译模板
}

// 把data中的第一层属性注入到 Vue 实例上
Vue.prototype._proxyData = function () {

}
