
// 自定义组件
const coustom = function (dataOrigin) {
  let dataState = {
    active: false,
    txt: 99,
    moveX: 0,
    moveY: 0,
    x: -332,
    y: -328,
    width: 332,
    height: 328,
    zIndex: 1,
    locked: false,
    skin: 0, // 0默认
    textEditorContent: ''
  }
  Object.assign(dataState, dataOrigin)
  return {
    namespaced: true,
    state: dataState,
    mutations: {
      saveTextEditor (state, data) {
        state.textEditorContent = data
      }
    }
  }
}

export default {
  coustom: coustom
}
