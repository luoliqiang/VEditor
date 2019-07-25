const keyboard = function () {
  const store = this.store
  const container = this.container
  const containerWraper = this.containerWraper
  const containerOffset = this.containerOffset

  container.oncontextmenu = function (e) {
    store.commit('visibleContextmenu', {
      x: e.pageX + containerWraper.scrollLeft - containerOffset.x,
      y: e.pageY + containerWraper.scrollTop - containerOffset.y,
      componentName: '',
      show: true
    })
    e.preventDefault()
    e.stopPropagation()
  }

  document.addEventListener('mousedown', (e) => {
    store.commit('visibleContextmenu', {
      show: false
    })
  })
}

export default keyboard
