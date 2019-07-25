/**
 *
 * 组件混入
 */
// import { mutationModule } from '@/store/dealModule.js'

let mousedownSelf = false
let compHoverTimer = false

// const handlerMouseup = function (e) {
//   mousedownSelf = false
// }

const handlerMouseenter = function (e) {
  clearTimeout(compHoverTimer)
  this.compHover = true
  e.stopPropagation()
}

const handlerMouseleave = function (e) {
  compHoverTimer = setTimeout(() => {
    this.compHover = false
  }, 600)
}

const handlerMousedown = function (e) {
  let activeModule = this.storeState.activeModule
  mousedownSelf = true
  // 已经按下Control键
  if (this.$editor.container.keydowns === 'Control') {
    if (!activeModule) {
      this.$store.commit('activeModule', this.moduleName)
    } else {
      if (activeModule instanceof Array) {
        this.$store.commit('activeModule', activeModule.concat([this.moduleName]))
      } else {
        this.$store.commit('activeModule', [activeModule, this.moduleName])
      }
    }
  } else {
    this.$store.commit('activeModule', this.moduleName)
  }
  this.compHover = true
}

const handlerContextmenu = function (e) {
  this.$store.commit('visibleContextmenu', {
    x: e.pageX - this.$editor.containerOffset.x,
    y: e.pageY - this.$editor.containerOffset.y,
    componentName: this.moduleName,
    show: true
  })
  event.preventDefault()
  event.stopPropagation()
}

export const mixinHoverActive = {
  data () {
    return {
      compHover: false
    }
  },
  computed: {
    showMenu () {
      return (this.$store.state.activeModule === this.moduleName || (!this.$store.state.activeModule && this.compHover))
    }
  },
  mounted () {
    // 选中组件
    this.$store.commit('activeModule', this.moduleName)
    // 组件创建后进行定位
    // const rect = this.$el.getBoundingClientRect()
    // mutationModule(this.moduleName, 'updatePos', {
    //   width: rect.width,
    //   height: rect.height,
    //   x: rect.left,
    //   y: rect.top
    // })
    // this.$store.commit('updateSize', {
    //   name: this.moduleName,
    //   width: rect.width,
    //   height: rect.height
    // })
    // this.$store.commit('updatePos', {
    //   name: this.moduleName,
    //   x: rect.left,
    //   y: rect.top
    // })
    // 组件hover和active效果
    this.$el.addEventListener('mouseenter', handlerMouseenter.bind(this), false)
    this.$el.addEventListener('mouseleave', handlerMouseleave.bind(this), false)
    this.$el.addEventListener('mousedown', handlerMousedown.bind(this), false)
    // this.$el.addEventListener('mouseup', handlerMouseup.bind(this), false)
    this.$el.addEventListener('contextmenu', handlerContextmenu.bind(this), false)
    // 组件放置到编辑区后默认选中状态
    /**
     * 只有新创建的组件才会mouseup后默认选择，如果是编辑渲染的页面，生成的组件不再监听mouseup选中
     * 判断是否是鼠标mousedown先执行，则判定为编辑状态渲染，否则为新建拖动产生的组件
    */
    let isNewMounted = true
    this.$editor.listenser.once({
      name: 'mouseup.mounted',
      callback: (opt) => {
        if (isNewMounted) {
          this.$store.commit('activeModule', this.moduleName)
        }
      }
    })

    // 冒泡事件 解除选中状态
    this.$editor.listenser.on({
      name: `mousedown.${this.moduleName}`,
      callback: (opt) => {
        // 点击该组件则不执行取消选中
        isNewMounted = false
        // this.$editor.listenser.remove('mouseup.mounted')
        if (mousedownSelf) {
          return
        }
        mousedownSelf = false
        this.$store.commit('activeModule', null)
      }
    })

    this.$editor.listenser.on({
      name: `mouseup.${this.moduleName}`,
      callback: (opt) => {
        mousedownSelf = false
      }
    })
  },
  beforeDestroy () {
    // 解绑事件
    this.$editor.listenser.remove(`mousedown.${this.moduleName}`)
    this.$el.removeEventListener('mouseenter', handlerMouseenter)
    this.$el.removeEventListener('mouseleave', handlerMouseleave)
    this.$el.removeEventListener(`mouseup.${this.moduleName}`, handlerMousedown)
    this.$el.removeEventListener('mousedown', handlerMousedown)
    // this.$el.removeEventListener('mouseup', handlerMouseup)
    this.$el.removeEventListener('contextmenu', handlerContextmenu)
  }
}
