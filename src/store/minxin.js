/**
 * state
*/

/* eslint-disable */

import Vue from 'vue'

// 分辨率
const Resolution = {
  state: {
    resolution: '1920*1080', // 分辨率 1920*1080(默认), 1440*1080
    resolutionIsCoustom: false,
    resolutionCoustom: ''
  },
  mutations: {
    changeResolution (state, data) {
      state.resolution = data.resolution
      state.resolutionIsCoustom = data.resolutionIsCoustom,
      state.resolutionCoustom = data.resolutionCoustom
    }
  }
}

// 中轴线
const Axis = {
  state: {
    showAxis: false // 显示中轴线
  },
  mutations: {
    toggleAxis (state, status) {
      state.showAxis = status
    }
  }
}
// 侧边栏
const Sidebar = {
  state: {
    showSidebar: true // 默认显示
  },
  mutations: {
    toggleSidebar (state, status) {
      state.showSidebar = status
    }
  }
}

// 对齐线
const Crossline = {
  state: {
    crossline: {
      x: -1, // 水平线
      y: -1 // 垂直线
    }
  },
  mutations: {
    updateCrossline (state, data) {
      if (typeof data.x !== 'undefined') {
        state.crossline.x = data.x
      }
      if (typeof data.y !== 'undefined') {
        state.crossline.y = data.y
      }
    }
  }
}

// 鼠标右键
const Contextmenu = {
  state: {
    contextmenu: { // 右键热键
      show: false,
      x: 0,
      y: 0,
      componentName: '' // ''空白点击，component点击组件
    }
  },
  mutations: {
    visibleContextmenu (state, opt) {
      for (let key in opt) {
        state.contextmenu[key] = opt[key]
      }
    }
  }
}

// 撤销前进
const Unredo = {
  state: {
    hasUndo: false,
    hasRedo: false
  },
  mutations: {
    updateHistory (state, data) {
      if (data) {
        // 修改（递归）
        const _deep = function(stateObj, d) {
          if (stateObj) {
            for (let key in d) {
              if (typeof d[key] === 'object' && d[key] !== null) {
                // if (typeof stateObj[key] !== 'object') {
                  // }
                Vue.set(stateObj, key, d[key] instanceof Array ? [] : {})
                _deep(stateObj[key], d[key])
              } else {
                Vue.set(stateObj, key, d[key])
              }
            }
          }
        }
        _deep(state, data)
        // 删除
        for (let key in state) {
          if (typeof data[key] === 'undefined') {
            Vue.delete(state, key)
          }
        }
      }
    },
    refreshHistoryBtn (state, data) {
      state.hasUndo = data.hasUndo
      state.hasRedo = data.hasRedo
    }
  }
}

// 富文本编辑器
const textEditor = {
  state: {
    textEditorVisible: false
  },
  mutations: {
    toggleEditorVisible (state, data) {
      state.textEditorVisible = data
    }
  }
}
// 自定义
const CoustomIcons = {
  state: {
    coustomIconsVisible: false,
    coustomIconsEdit: {
      visible: false,
      sfrom: 1, // 1 自定义图标弹框已选，2 自定义图标自定义添加，3 自定义图标自定义编辑，4 桌面图标编辑
      data: {
        exePath: '',
        name: ''
      }
    } // 添加或者编辑add edit 编辑的图标的详细数据
  },
  mutations: {
    toggleCoustomIconsVisible (state, data) {
      state.coustomIconsVisible = data
    },
    toggleCoustomIconsEdit (state, data) {
      state.coustomIconsEdit = data
    }
  }
}

export default {
  Resolution: Resolution,
  Axis: Axis,
  Crossline: Crossline,
  Contextmenu: Contextmenu,
  Unredo: Unredo,
  textEditor: textEditor,
  Sidebar
}
