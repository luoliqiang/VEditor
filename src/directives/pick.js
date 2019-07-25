import { addModule, deleteModule } from '@/store/dealModule.js'

const pickDirt = {
  name: 'pick',
  bind (el, binding, vnode) {
    const mousedownHandler = function () {
      if (binding.value === 'forbid') { // 禁止添加
        return
      }
      const $editor = vnode.context.$editor
      const store = vnode.context.$store
      const listenser = $editor.listenser
      let createLock = false
      let pos

      const compName = binding.value // 组件名称
      let moduleName // 数据模块 store-module名称

      // 监听mousemove进行组件添加
      listenser.on({
        name: 'mousemove.pick',
        callback (opt) {
          // 移除菜单区时生成组件 删除事件
          if (opt.moveX > 0 && !createLock) {
            createLock = true
            moduleName = addModule(compName, opt)
          } else {
            const state = store.state[moduleName]
            if (state && state.width) {
              pos = {
                name: moduleName,
                x: opt.moveX - state.width / 2,
                y: opt.moveY - state.height / 2
              }
              store.commit('updatePos', pos)
            }
          }
        }
      })

      listenser.once({
        name: 'mouseup.pick',
        callback () {
          createLock = false
          listenser.remove('mousemove.pick')
          if (moduleName) {
            let rect = $editor.container.getBoundingClientRect()
            const state = store.state[moduleName]
            let borderY = rect.height - 40
            let borderX = rect.width - 362

            if (pos && (pos.x < 0 || pos.y < 0 || (pos.x + state.width > borderX) || (pos.y + state.height > borderY))) { // 完全放入编辑器组件才生效，否则删除
              setTimeout(() => { // 事件队列让删除在组件添加完成后，否则找不到对于的activemodule所以无法删除，code in mixin/index.js
                deleteModule(moduleName)
              }, 0)
            } else {
              // 生成了组件则记录进入历史记录
              store.history.update()
            }
          }
        }
      })
    }

    el.addEventListener('mousedown', mousedownHandler, false)
  }
}

export default pickDirt
