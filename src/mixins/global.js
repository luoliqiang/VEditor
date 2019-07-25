/**
 *
 * 全局组件混入
 */
import {
  iteratorModule,
  iteratorActiveModule,
  activeUnlockModule,
  getSingleActiveModule
} from '@/assets/js/editor/tool/store.js'

const install = function (Vue, opts = {}) {
  Vue.mixin({
    computed: {
      storeState () { // store中的state对象
        return this.$store.state
      },
      activeModuleName () { // store中的选中组件名
        return this.$store.state.activeModule
      }
    },
    methods: {
      deepClone (data) {
        try {
          return JSON.parse(JSON.stringify(data))
        } catch (e) {
        }
        return null
      },
      iteratorModule (cb) { // 遍历组件列表 返回数据和name
        return iteratorModule(this.storeState, cb)
      },
      iteratorActiveModule (cb, cbFalse) { // 遍历选中列表 返回数据和name
        return iteratorActiveModule(this.storeState, cb, cbFalse)
      },
      activeUnlockModule () {
        return activeUnlockModule(this.storeState)
      },
      getSingleActiveModule (key) {
        return getSingleActiveModule(this.storeState, key)
      }
    }
  })
}

export default install
