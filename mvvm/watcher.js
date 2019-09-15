
function Watcher (vm, expr, cb) {
  // vue 的实例，使用里面的 data
  this.vm = vm
  // 数据data的属性 name, dog.name
  this.expr = expr
  // 回调函数，更新视图的回调函数
  this.cb = cb
  // 给Dep.target 设置当前实例，在 get 的时候会调用
  Dep.target = this
  this.oldValue = this.getVMValue()
  Dep.target = null
}

Watcher.prototype = {
  constructor: Watcher,
  update () {
    // 获取到新的值
    const newValue = this.getVMValue()
    if (this.oldValue === newValue) {
      return
    }
    // 更新视图
    this.cb(newValue)
  },
  // 获取 data 中的数据
  getVMValue () {
    let data = this.vm.$data
    // name / dog.name
    this.expr.split('.').forEach(key => {
      data = data[key]
    })

    return data
  }
}
