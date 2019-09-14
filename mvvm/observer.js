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
    Object.defineProperty(data, key, {
      // 属性描述符
      configurable: false,
      enumerable: true,
      get () {
        return value
      },
      set (newValue) {
        if (value === newValue) {
          return
        }
        value = newValue

        // 数据变化，通知订阅者，数据发生变化要去更新视图
        
      }
    })
  }
}
