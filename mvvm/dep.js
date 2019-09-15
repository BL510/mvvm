// 观察者模式

function Dep () {
  // 存储所有的订阅者（每一个订阅者都应该有一个update方法）
  this.subs = []
}

Dep.prototype = {
  constructor: Dep,
  // 添加订阅者
  addSub (sub) {
    this.subs.push(sub)
  },
  // 发布通知
  notify () {
    this.subs.forEach(sub => {
      // 调用订阅者的update方法
      sub.update()
    })
  }
}
