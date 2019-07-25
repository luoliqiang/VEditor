/**
 *
 * store数据处理相关函数
 * @author: luoliqiang
 */

// 是否是子模块数据
export const isModule = function (storeKey) {
  if (storeKey.indexOf('module-') === 0) {
    return true
  } else {
    return false
  }
}
// 是否有激活组件
export const hasActiveModule = function (moduleName, activeModule) {
  if (!moduleName || activeModule) {
    return false
  }
  if (!Array.isArray(activeModule)) {
    return activeModule.indexOf(moduleName) === -1
  } else {
    return moduleName === activeModule
  }
}
// 遍历组件列表 返回数据和name
export const iteratorModule = function (state, cb) {
  let arr = []
  for (let key in state) {
    let item = state[key]
    if (isModule(key)) {
      arr.push(item)
      cb && cb(item, key)
    }
  }
  return arr
}
// 遍历选中列表 返回数据和name
export const iteratorActiveModule = function (state, cb, cbFalse) {
  let data = []
  let name = state.activeModule
  if (name) {
    if (Array.isArray(name)) {
      for (let key of name) {
        cb && cb(state[key], key)
        data.push(state[key])
      }
    } else {
      cb && cb(state[name], name)
      data.push(state[name])
    }
  } else {
    cbFalse && cbFalse()
  }
  return data
}
// 返回未被锁定的激活组件
export const activeUnlockModule = function (state) {
  let modules = iteratorActiveModule(state)
  if (modules.length) {
    modules = modules.filter((item) => {
      return !item.locked
    })
  }
  return modules
}
// 是否只有一个组件选中且返回key-value值
export const getSingleActiveModule = function (state, key) {
  let name = state.activeModule
  if (!name || Array.isArray(name)) {
    return null
  } else {
    if (key) {
      return state[name][key]
    } else {
      return state[name]
    }
  }
}
// 删除历史记录存储时不必要的数据
// export const formatHistorySaveData = function (data) {
// let newData = JSON.parse(JSON.stringify(data))
// let saveKeys = [
//   'activeModule',
//   'deskIconsVisbile',
//   'randomWall',
//   'resolution',
//   'resolutionCoustom',
//   'resolutionIsCoustom',
//   'showAxis',
//   'showSidebar',
//   'crossline',
//   'wall',
//   'selectArea'
// ]

// for (let key in newData) {
//   if (key.indexOf('module-') === -1 && saveKeys.indexOf(key) === -1) {
//     delete newData[key]
//   }
// }
//   return newData
// }

export default {
  isModule,
  hasActiveModule,
  iteratorModule,
  iteratorActiveModule,
  activeUnlockModule,
  getSingleActiveModule
  // formatHistorySaveData
}
