
/**
 *
 * 入口文件
 *
 * @author: luoliqiang
 * @copyright: shunwang cd, 2019
 */

import listenser from './core/listenser.js'
import container from './core/container.js'
import events from './core/events.js'
import contextmenu from './core/contextmenu.js'
import drag from './core/drag.js'
import keyboard from './core/keyboard.js'

const assmble = [
  listenser,
  container,
  events,
  drag,
  contextmenu,
  keyboard
]

const install = function (Vue, opts = {}) {
  // 所有方法挂载到Vue.prototype.$editor对象上
  let editor = Object.create(null)
  editor.selector = opts.selector
  editor.store = opts.store
  assmble.forEach(item => {
    item.bind(editor)()
  })

  window.editor = Vue.prototype.$editor = editor
}

export default {
  install,
  listenser,
  container,
  events,
  drag,
  keyboard,
  contextmenu
}
