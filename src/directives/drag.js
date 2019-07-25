const dragDirt = {
  name: 'drag',
  bind (el, binding, vnode) {
    const context = vnode.context
    el.addEventListener('mousedown', (e) => {
      let containerWraper = context.$editor.containerWraper
      let startX = e.pageX + containerWraper.scrollLeft
      let endX = e.pageY + containerWraper.scrollTop
      let borderY = context.$editor.container.getBoundingClientRect().height
      let borderX = context.$editor.container.getBoundingClientRect().width

      context.$editor.drag(startX, endX, borderY, borderX)
      // 阻止冒泡
      if (binding.modifiers.stop) {
        e.stopPropagation()
      }
    })
  }
}

export default dragDirt
