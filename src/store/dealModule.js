import store from './index.js'
import storeData from './data.js'
import { warn } from '@/assets/js/editor/tool/debug.js'
/**
 *
 * 模块命名 规则递增
 */
const nameModule = function (compName) {
  let moduleName = `module-${compName}`
  let id = ''

  for (let name in store.state) {
    if (name.indexOf(moduleName) === 0) {
      let moduleId = name.split(moduleName + '-')[1]
      if (moduleId) {
        if (id === '' || id <= moduleId) {
          id = Number(moduleId) + 1
        }
      } else {
        id = 1
      }
    }
  }
  if (id) {
    moduleName = `${moduleName}-${id}`
  }
  return moduleName
}
/**
 *
 * 添加子组件
 */
export const addModule = function (compName, data) {
  if (!storeData[compName]) {
    warn('没找到对应的组件！')
    return
  }
  const moduleName = nameModule(compName)
  store.registerModule(moduleName, storeData[compName](data))
  return moduleName
}
/**
 *
 * 还原子组件
 */
export const renderModule = function (moduleName, stateData) {
  const compName = moduleName.split('-')[1]
  if (!storeData[compName]) {
    warn('没找到对应的组件！')
    return
  }
  store.registerModule(moduleName, storeData[compName](stateData))
  return moduleName
}
/**
 *
 * 删除子组件
 */
export const deleteModule = function (moduleName) {
  const activeModule = store.state.activeModule
  if (!moduleName) { // 默认不传移除所有被选中组件
    if (activeModule) {
      store.commit('activeModule', null)
      if (Array.isArray(activeModule)) {
        for (let name of activeModule) {
          store.unregisterModule(name)
        }
      } else {
        store.unregisterModule(activeModule)
      }
    }
  } else {
    store.unregisterModule(moduleName)
    // 更新activeModule
    if (Array.isArray(activeModule)) {
      let copyModule = Object.assign([], activeModule)
      copyModule.splice(copyModule.indexOf(moduleName), 1)
      store.commit('activeModule', copyModule)
    } else if (activeModule === moduleName) {
      store.commit('activeModule', null)
    }
  }
}
/**
 *
 * 执行子组件mutation方法
 */
export const mutationModule = function (moduleName, method, data) {
  store.commit(`${moduleName}/${method}`, data)
}
