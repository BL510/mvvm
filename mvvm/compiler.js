// 编译指令/差值表达式
// 直接操作DOM （忽略了虚拟的DOM的存在）
function Compiler (vm) {
  this.vm = vm
  this.el = vm.$el

  // 编译模板
  this.compile(this.el)
}

Compiler.prototype = {
  constructor: Compiler,
  // 编译模板
  compile (el) {
    // 获取el中的子节点
    const nodes = el.childNodes
    // 遍历所有子节点
    Array.from(nodes).forEach(node => {
      // console.dir(node)
      // 判断是什么类型的节点
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        // 元素节点
        this.compileElement(node)
      }

      // 如果当前遍历到的node中还有子节点，继续编译
      if (node.childNodes && node.childNodes.length > 0) {
        // 递归调用，深度遍历子节点
        this.compile(node)
      }
    })
  },
  // 编译元素节点
  compileElement (node) {
    // v-text="dog.name"
  },
  // 编译文本节点
  compileText (node) {
    compileUtil.mustache(node, this.vm)
  },
  // 判断是否是文本节点
  isTextNode (node) {
    return node.nodeType === 3
  },
  // 判断是否元素节点
  isElementNode (node) {
    return node.nodeType === 1
  },
  // 判断当前属性是否是vue的指令   v-html  v-text
  isDirective (attr) {
    return attr.startsWith('v-')
  }
}

// 封装一个方便处理编译模板的对象
const compileUtil = {
  // 处理差值表达式
  mustache (node, vm) {
    // () 是正则表达式中的分组，分组匹配到的结果可以通过 RexExp.$1。。。
    const reg = /\{\{(.+)\}\}/
    // 文本节点的内容  Name: {{ name }}      abc
    const value = node.textContent
    // 判断是否匹配
    if (reg.test(value)) {
      // 获取差值表达式里面绑定的属性 name
      const key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.getVMValue(vm, key))
    }
  },
  // v-text
  text (node, vm, expr) {
  },
  // v-html
  html (node, vm, expr) {
  },
  // v-model
  model (node, vm, expr) {
  },
  // 获取绑定的属性的值
  // vm Vue的实例，需要 data
  // expr  绑定的属性的名字 name / dog.name
  getVMValue (vm, expr) {
    let data = vm.$data
    // expr = name
    // data = data[expr]
    // expr = dog.name
    
    // expr = name --> ['name']
    // expr = dog.name --->  ['dog', 'name']  >>> 1. data=data['dog']  2. data=data['name']
    // data = { name: 'zx', dog: { name: 'byd' } }
    expr.split('.').forEach(key => {
      data = data[key]
    })

    // 最终 data 中的值，是我们获取到属性对应的值
    return data
  },
  setVMValue (vm, expr, value) {
    let data = vm.$data

    // expr -- 'name'
    //    data[key] = value
    // expr -- 'dog.name'
    //    
    const arr = expr.split('.')
    arr.forEach((key, index) => {
      // 如果当前属性的索引  =  数组的最后一项，设置 data[key] = value
      if (index < arr.length - 1) {
        data = data[key]
      } else {
        // 最后一项
        data[key] = value
      }
    })
  }
}
