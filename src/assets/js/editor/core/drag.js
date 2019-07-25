/* eslint-disable */
import { isModule } from '@/assets/js/editor/tool/store.js'
let store
/**
 * 拖拽对齐线
 *
*/
let crossArr = []
// 获取未拖动组件的各个坐标点
const getModuleCross = function (state, excludeModule) {
  crossArr = []
  for (let key in state) {
    if ((!Array.isArray(excludeModule) && key !== excludeModule) || (Array.isArray(excludeModule) && excludeModule.indexOf(key) === -1)) {
      if (isModule(key)) {
        const item = state[key]
        crossArr.push({
          x: item.x,
          y: item.y,
          cx: item.x + item.width / 2,
          cy: item.y + item.height / 2,
          rx: item.x + item.width,
          by: item.y + item.height
        })
      }
    }
  }
}

let createCrossTimer = null
let alignDistanceX // 磁吸x距离,对齐线显示时候的拖动元素会自动锁定到对齐线，制造磁吸引的效果，
let alignDistanceY
const createCross = function (state, x, y, cx, cy, rx, by) {
  if (!crossArr.length) {
    return
  }
  let vert // 水平线
  let hsd // 垂直线
  let disX = 0
  let disY = 0
  let disBase = 5 // 磁吸距离阀值

  let xArr = [cx, x, rx]
  let yArr = [cy, y, by]

  outer:
  for (let item of crossArr) {
    // vert 水平对齐线
    for (let val of xArr) {
      for (let key of ['cx', 'x', 'rx']) {
        if (Math.abs(item[key] - val) < disBase) {
          vert = item[key]
          disX = item[key] - val
          break outer
        }
      }
    }
    // hsd 垂直对齐线
    for (let val of yArr) {
      for (let key of ['cy', 'y', 'by']) {
        if (Math.abs(item[key] - val) < disBase) {
          hsd = item[key]
          disY = item[key] - val
          break outer
        }
      }
    }
  }

  if (disX) {
    alignDistanceX = disX || 0
  }
  if (disY) {
    alignDistanceY = disY || 0
  }

  // 截流
  clearTimeout(createCrossTimer)
  createCrossTimer = setTimeout(() => {
    state.crossline.y = vert || -1
    state.crossline.x = hsd || -1
  }, 10)
}

const clearModuleCross = function (state) {
  clearTimeout(createCrossTimer)
  createCrossTimer = setTimeout(() => {
    state.crossline.y = -1
    state.crossline.x = -1
  }, 10)
}

// 辅助线坐标 左右 左下 右下
const constructorBundleEdge = function () {
  let bundleX
  let bundleY
  let bundleRx
  let bundleBy
  return function (state, compMouseX, compMouseY) {
    // 计算拖动模块的各个坐标点
    if (typeof bundleX === 'undefined' || bundleX > compMouseX) {
      bundleX = compMouseX
    }
    if (typeof bundleY === 'undefined' || bundleY > compMouseY) {
      bundleY = compMouseY
    }
    if (typeof bundleRx === 'undefined' || (compMouseX + state.width) > bundleRx) {
      bundleRx = compMouseX + state.width
    }
    if (typeof bundleBy === 'undefined' || (compMouseY + state.width) > bundleBy) {
      bundleBy = compMouseY + state.height
    }
    return {
      x: bundleX,
      y: bundleY,
      rx: bundleRx,
      by: bundleBy
    }
  }
}
/**
 * 模块移动
*/

const move = function (startPageX, startPageY, borderY, borderX) { // 开始点，零界点
  let hasMoved = false
  let state = store.state
  let listenser = this.listenser
  let moduleName = state.activeModule
  const containerOffset = this.containerOffset

  if (typeof moduleName === 'string') {
    moduleName = [moduleName]
  }
  // 多选组件移动
  let offsetPos = []
  for (let item of moduleName) {
    offsetPos.push({
      x: startPageX - containerOffset.x - state[item].x,
      y: startPageY - containerOffset.y - state[item].y
    })
  }
  // 获取除开自己之外所有模块的坐标
  getModuleCross(state, moduleName)
  // 监听mousemove进行移动
  listenser.on({
    name: 'mousemove.drag',
    callback: function (opt) {
      hasMoved = true
      // 拖动模块组的边角和中心点
      let bundleEdge
      let computeBundleEdge = constructorBundleEdge()

      for (let i = 0; i < moduleName.length; i++) {
        let name = moduleName[i]
        let compMouseX = opt.moveX - offsetPos[i].x // 拖动元素左上角的跟随鼠标X坐标（会一直跟随鼠标变化）
        let compMouseY = opt.moveY - offsetPos[i].y // 拖动元素左上角的鼠标移动Y坐标

        bundleEdge = computeBundleEdge(state[name], compMouseX, compMouseY)
        
        let updatePos = { // 拖动元素的更新坐标，遇到编辑器边缘或者对齐线时，坐标会不再或暂时不再变化
          name: name,
          x: compMouseX,
          y: compMouseY
        }
        // 锁定组件不能拖动
        if (state[name].locked) {
          continue
        }
        // 编辑区边缘不可再拖动
        if (updatePos.x < 0) {
          updatePos.x = 0
        }
        if (updatePos.y < 0) {
          updatePos.y = 0
        }
        // 底部不能拖动区域
        if (updatePos.y + state[name].height > borderY) {
          updatePos.y = borderY - state[name].height
        }
        // 右侧不能拖动区
        if (updatePos.x + state[name].width > borderX) {
          updatePos.x = borderX - state[name].width
        }
        setTimeout(() => {
          // 组件对齐线
          if (alignDistanceY) {
            updatePos.y = updatePos.y + alignDistanceY
          }
          if (alignDistanceX) {
            updatePos.x = updatePos.x + alignDistanceX
          }
          store.commit('updatePos', updatePos)
        }, 0)
      }
      // 辅助线坐标 中心点
      bundleEdge.cx = bundleEdge.x + (bundleEdge.rx - bundleEdge.x) / 2
      bundleEdge.cy = bundleEdge.y + (bundleEdge.by - bundleEdge.y) / 2

      // 辅助线
      createCross(state, bundleEdge.x, bundleEdge.y, bundleEdge.cx, bundleEdge.cy, bundleEdge.rx, bundleEdge.by)
    }
  })
  // 移除监听
  listenser.once({
    name: 'mouseup.drag',
    callback: function (opt) {
      listenser.remove('mousemove.drag')
      clearModuleCross(state)
      if (hasMoved) {
        store.history.update()
        hasMoved = false
      }
    }
  })
}

const drag = function () {
  store = this.store
  this.drag = move
  return move
}
export default drag
