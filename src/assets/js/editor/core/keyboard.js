
import keymap from '@/assets/js/editor/tool/keymap.js'
import { deleteModule } from '@/store/dealModule.js'
// import { iteratorModule } from '@/assets/js/editor/tool/store.js'

const keyboard = function () {
  const listenser = this.listenser
  const container = this.container
  // const store = this.store

  const handlerDelete = function () {
    deleteModule()
  }

  // const selectAll = function () {
  //   let moduleArr = []
  //   iteratorModule(store.state, (item, name) => {
  //     moduleArr.push(name)
  //   })

  //   if (moduleArr.length > 1) {
  //     store.commit('activeModule', moduleArr)
  //   } else if (moduleArr.length === 1) {
  //     store.commit('activeModule', moduleArr[0])
  //   }
  // }

  window.addEventListener('keydown', (e) => {
    const keyCode = e.keyCode
    // if (e.ctrlKey) { // Ctrl+
    //   if (keyCode === keymap('A')) { // Ctrl + A
    //     selectAll()
    //   }
    // }
    if (keyCode === keymap('Control')) {
      container.keydowns = 'Control'
    }
    listenser.fire('keydown', keyCode, e)
  })

  window.addEventListener('keyup', (e) => {
    const keyCode = e.keyCode
    if (keyCode === keymap('Delete')) {
      handlerDelete(keyCode)
    }
    if (keyCode === keymap('Control')) {
      container.keydowns = ''
    }
    listenser.fire('keyup', keyCode, e)
  })
}

export default keyboard
