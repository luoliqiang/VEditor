/**
 *
 * 全局鼠标事件监听
 * moveX moveY：鼠标相对于container编辑区的位置坐标
 * 用e.pageX是因为offsetX会出现勾选遮罩触发mouse导致的位置错误bug
 * @author: luoliqiang
 */

import { isModule } from '@/assets/js/editor/tool/store.js'

const events = function () {
  const container = this.container
  const containerWraper = this.containerWraper
  const listenser = this.listenser
  const containerOffset = this.containerOffset
  let store = this.store

  let isDragSelect = false
  let startX, startY, endX, endY

  const isSelected = function (data) {
    if (data.x > startX && data.y > startY && (data.x + data.width) < endX && (data.y + data.height) < endY) {
      return true
    } else {
      return false
    }
  }

  const selectComponents = function () {
    let selectedNames = []
    for (let key in store.state) {
      const item = store.state[key]
      if (isModule(key)) {
        if (isSelected(item)) {
          selectedNames.push(key)
        }
      }
    }

    if (selectedNames.length === 1) { // 只选中一个
      store.state.activeModule = selectedNames[0]
    } else if (selectedNames.length > 1) {
      store.state.activeModule = selectedNames
    }
  }

  container.addEventListener('mousedown', (e) => {
    let moveX = e.pageX + containerWraper.scrollLeft - containerOffset.x
    let moveY = e.pageY + containerWraper.scrollTop - containerOffset.y

    listenser.fire('mousedown', {
      moveX: moveX,
      moveY: moveY
    })
    // 是否在空白区域点击
    if (!store.state.activeModule) {
      isDragSelect = true
      startX = moveX
      startY = moveY
    }
  })

  document.addEventListener('mousemove', (e) => {
    let moveX = e.pageX + containerWraper.scrollLeft - containerOffset.x
    let moveY = e.pageY + containerWraper.scrollTop - containerOffset.y

    listenser.fire('mousemove', {
      moveX: moveX,
      moveY: moveY
    })
    if (isDragSelect) {
      endX = moveX
      endY = moveY
      // 空白区域拖拽选中框
      store.state.selectArea = {
        show: true,
        x: startX,
        y: startY,
        rx: endX,
        by: endY
      }
      selectComponents()
    }
  })

  document.addEventListener('mouseup', (e) => {
    let moveX = e.pageX + containerWraper.scrollLeft - containerOffset.x
    let moveY = e.pageY + containerWraper.scrollTop - containerOffset.y
    if (isDragSelect === true) {
      isDragSelect = false
      store.state.selectArea = {
        show: false,
        x: 0,
        y: 0,
        rx: 0,
        by: 0
      }
    }

    listenser.fire('mouseup', {
      moveX: moveX,
      moveY: moveY
    })
  })
  /**
   * Esc退出全屏事件
   */
  document.addEventListener('webkitfullscreenchange', function (e) {
    if (document.webkitIsFullScreen) {
      listenser.fire('entryfullScreen', {})
    } else {
      listenser.fire('exitFullScreen', {})
    }
  })
}

export default events
