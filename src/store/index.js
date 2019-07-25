import Vue from 'vue'
import Vuex from 'vuex'
import history from './history.js'
import minxin from './minxin'
import storeHelper from '@/assets/js/editor/tool/store.js'

Vue.use(Vuex)

const checkSameIndex = function (state) {
  const activeModule = state.activeModule
  const activeIndex = state[activeModule].zIndex
  for (let key in state) {
    if (storeHelper.isModule(key)) {
      if (key !== activeModule && activeIndex === state[key].zIndex) {
        return true
      }
    }
  }
  return false
}

const storeMixinFlat = function (type, obj) {
  let newObj = {}
  for (let item in obj) {
    for (let key in obj[item]) {
      if (key === type) {
        Object.assign(newObj, obj[item][key])
      }
    }
  }
  return newObj
}

const store = new Vuex.Store({
  state: Object.assign(storeMixinFlat('state', minxin), {
    activeModule: null, // activeModule可能为字符串（单选），或者数组（多选）
    selectArea: { // 选择区
      show: false,
      x: 0,
      y: 0,
      rx: 0,
      by: 0
    },
    editData: ''
  }),
  mutations: Object.assign(storeMixinFlat('mutations', minxin), {
    updateSize (state, data) { // 修改尺寸
      let name = data.name || state.activeModule
      if (typeof data.width !== 'undefined') {
        state[name].width = data.width
      }
      if (typeof data.height !== 'undefined') {
        state[name].height = data.height
      }
    },
    updatePos (state, data) { // 修改坐标
      let name = data.name || state.activeModule
      if (typeof data.x !== 'undefined') {
        state[name].x = data.x
      }
      if (typeof data.y !== 'undefined') {
        state[name].y = data.y
      }
    },
    lock (state, type) { // 锁定
      if (type === 'lock') {
        storeHelper.iteratorActiveModule(state, (data, name) => {
          if (data.locked === false) {
            data.locked = true
          }
        })
      } else {
        storeHelper.iteratorActiveModule(state, (data, name) => {
          if (data.locked === true) {
            data.locked = false
          }
        })
      }
    },
    updownComponent (state, type) { // 置顶/置底
      let maxIndex = 1
      let activeState = state[state.activeModule]
      let hasSameIndex = checkSameIndex(state)

      for (let key in state) {
        if (storeHelper.isModule(key)) {
          let item = state[key]
          if (type === 'up') {
            if (item.zIndex > activeState.zIndex) { // 被置顶元素之上元素重排序
              if (!hasSameIndex) {
                item.zIndex--
              }
              if (item.zIndex > maxIndex) {
                maxIndex = item.zIndex
              }
            }
          } else if (type === 'down') {
            if (hasSameIndex || item.zIndex < activeState.zIndex) { // 被置底部元素之下或者所有元素重排序
              item.zIndex++
            }
          }
        }
      }

      if (type === 'up') {
        activeState.zIndex = maxIndex + 1
      } else {
        activeState.zIndex = 1
      }
    },
    activeModule (state, compName) { // 选中的组件
      state.activeModule = compName
    }
  }),
  modules: {}
})

store.history = history(store, Vue)

export default store
