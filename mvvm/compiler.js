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
        this.compile(node)
      }
    })
  },
  // 编译元素节点
  compileElement (node) {
  },
  // 编译文本节点
  compileText (node) {
    // console.dir(node)
    // 匹配差值表达式的正则表达式
    // () 是正则表达式中的分组，分组匹配到的结果可以通过 RexExp.$1。。。
    const reg = /\{\{(.+)\}\}/
    // 文本节点的内容  Name: {{ name }}
    const value = node.textContent
    // 判断是否匹配
    if (reg.test(value)) {
      // 获取差值表达式里面绑定的属性 name
      const key = RegExp.$1.trim()
      node.textContent = value.replace(reg, this.vm.$data[key])
    }
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
