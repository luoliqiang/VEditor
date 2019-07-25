<template>
  <div>
    <div
      class="outer"
      v-for="(item,idx) in selectedComps"
      :key="idx"
      :style="getStyles(item)"
      :class="{'outer-locked': item.locked}"
      v-drag.stop>
      <div class="multiple-layer"></div>
      <div v-show="stretchType === 'all'" class="top" :class="{'el-icon-close': item.locked}" @mousedown.stop="resize('top', item)" :style="{top: '-6px', left: '-6px'}"></div>
      <div v-show="stretchType === 'all'" class="right" :class="{'el-icon-close': item.locked}" @mousedown.stop="resize('right', item)" :style="{top: '-6px', left: item.width + 'px'}"></div>
      <div v-show="stretchType === 'all'" class="bottom" :class="{'el-icon-close': item.locked}" @mousedown.stop="resize('bottom', item)" :style="{top: item.height + 'px', left: item.width + 'px'}"></div>
      <div v-show="stretchType === 'all'" class="left" :class="{'el-icon-close': item.locked}" @mousedown.stop="resize('left', item)" :style="{top: item.height + 'px', left: '-6px'}"></div>
      <div v-show="stretchType !== 'hsd'" class="vert-left" :class="{'el-icon-close': item.locked}" @mousedown.stop="resize('vertLeft', item)" :style="{top: item.height / 2 - 3 + 'px', left: '-6px'}"></div>
      <div v-show="stretchType !== 'hsd'" class="vert-right" :class="{'el-icon-close': item.locked}" @mousedown.stop="resize('vertRight', item)" :style="{top: item.height / 2 - 3 + 'px', left: item.width + 'px'}"></div>
      <div v-show="stretchType !== 'vert'" class="hsd-top" :class="{'el-icon-close': item.locked}" @mousedown.stop="resize('hsdTop', item)" :style="{top: '-6px', left: item.width / 2 - 3 + 'px'}"></div>
      <div v-show="stretchType !== 'vert'" class="hsd-bottom" :class="{'el-icon-close': item.locked}" @mousedown.stop="resize('hsdBottom', item)" :style="{top: item.height + 'px', left: item.width / 2 - 3 + 'px'}"></div>
    </div>
  </div>
</template>

<script>
import { minimum } from '@/assets/js/editor/tool/util.js'
export default {
  data () {
    return {}
  },
  computed: {
    stretchType () {
      if (this.activeModuleName === 'module-coustom' || this.activeModuleName === 'module-origin') {
        let skinType = this.getSingleActiveModule('skin')
        if (skinType === 2) { // 上下拉伸
          return 'hsd'
        }
        if (skinType === 7 || skinType === 8) { // 左右拉伸
          return 'vert'
        }
      }
      return 'all'
    },
    selectedComps () {
      let activeModule = this.activeModuleName
      let posAll = []
      let lockedComp = []
      let unlockedComp = []

      if (!activeModule) {
        return
      }

      this.iteratorActiveModule((data) => {
        if (data.locked) {
          lockedComp.push(data)
        } else {
          unlockedComp.push(data)
        }
      })

      // 多选未被锁定的组件时重新计算选中框
      if (unlockedComp.length > 1) {
        let left = minimum('x', unlockedComp)
        let top = minimum('y', unlockedComp)
        let right
        let bottom

        for (let i = 0; i < unlockedComp.length; i++) {
          let item = unlockedComp[i]
          if (typeof right === 'undefined' || (item.x + item.width) > right) {
            right = item.x + item.width
          }
          if (typeof bottom === 'undefined' || (item.y + item.height) > bottom) {
            bottom = item.y + item.height
          }
        }
        posAll.push({
          locked: false, // 是否是锁定元素
          multiSelect: true, // 是否是多选
          left: left,
          top: top,
          width: right - left,
          height: bottom - top
        })
      } else if (unlockedComp.length === 1) {
        posAll.push({
          locked: false,
          left: unlockedComp[0].x,
          top: unlockedComp[0].y,
          width: unlockedComp[0].width,
          height: unlockedComp[0].height
        })
      }

      if (lockedComp.length) {
        for (let item of lockedComp) {
          posAll.push({
            locked: true,
            left: item.x,
            top: item.y,
            width: item.width,
            height: item.height
          })
        }
      }
      return posAll
    }
  },
  methods: {
    getStyles (item) {
      let styles = {
        top: item.top + 'px',
        left: item.left + 'px'
      }

      if (!item.locked && item.multiSelect) {
        styles.width = item.width + 'px'
        styles.height = item.height + 'px'
      }
      return styles
    },
    resize (dir, selectedComp) {
      // 多选和锁定情况下不能调整尺寸
      let data = Object.assign({}, selectedComp)
      if (data.multiSelect || data.locked) {
        return
      }
      const listenser = this.$editor.listenser
      const startX = event.pageX - this.$editor.containerOffset.x
      const startY = event.pageY - this.$editor.containerOffset.y
      const originWidth = data.width
      const originHeight = data.height

      listenser.on({
        name: 'mousemove.resize',
        callback: (opt) => {
          let offsetX = opt.moveX - startX
          let offsetY = opt.moveY - startY

          if (dir === 'top') {
            data.left = opt.moveX
            data.top = opt.moveY
            data.width = originWidth - offsetX
            data.height = originHeight - offsetY
          } else if (dir === 'right') {
            if (data.height > 0) {
              data.top = opt.moveY
            }
            data.width = originWidth + offsetX
            data.height = originHeight - offsetY
          } else if (dir === 'bottom') {
            data.width = originWidth + offsetX
            data.height = originHeight + offsetY
          } else if (dir === 'left') {
            data.left = opt.moveX
            data.width = originWidth - offsetX
            data.height = originHeight + offsetY
          } else if (dir === 'vertLeft') {
            data.left = opt.moveX
            data.width = originWidth - offsetX
          } else if (dir === 'vertRight') {
            data.width = originWidth + offsetX
          } else if (dir === 'hsdTop') {
            data.top = opt.moveY
            data.height = originHeight - offsetY
          } else if (dir === 'hsdBottom') {
            data.height = originHeight + offsetY
          }

          if (data.width < 80) {
            data.width = 80
          }
          if (data.height < 100) {
            data.height = 100
          }
          this.updateResize(data)
        }
      })

      listenser.once({
        name: 'mouseup.resize',
        callback: (opt) => {
          this.$store.history.update()
          listenser.remove('mousemove.resize')
        }
      })
    },
    updateResize (data) {
      const _update = (name) => {
        this.$store.commit('updateSize', {
          name: name,
          width: data.width,
          height: data.height
        })

        this.$store.commit('updatePos', {
          name: name,
          x: data.left,
          y: data.top
        })
      }

      this.iteratorActiveModule((data) => {
        if (!data.locked) {
          _update(name)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.outer {
  position: absolute;
  z-index: 99;
  .vert-left,
  .vert-right,
  .hsd-top,
  .hsd-bottom,
  .top,
  .bottom,
  .left,
  .right {
    position: absolute;
    display: inline-block;
    width: 6px;
    height: 6px;
    background: #fff;
    box-sizing: border-box;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.30);
  }
  &.outer-locked {
    .vert-left,
    .vert-right,
    .hsd-top,
    .hsd-bottom,
    .top,
    .bottom,
    .left,
    .right {
      background: transparent;
      box-sizing: border-box;
      box-shadow: 0 0 2px 0 rgba(0,0,0,0.30);
      &:before {
        position: absolute;
        top: -2px;
        left: -3px;
        font-size: 12px;
        color: #C6C6C6;
      }
      &:hover {
        cursor: initial !important;
      }
    }
  }
  .top, {
    &:hover {
      cursor: nw-resize;
    }
  }
  .right {
    &:hover {
      cursor: ne-resize;
    }
  }
  .bottom {
    &:hover {
      cursor: nw-resize;
    }
  }
  .left {
    &:hover {
      cursor: ne-resize;
    }
  }
  .vert-right,
  .vert-left {
    &:hover {
      cursor: w-resize;
    }
  }
  .hsd-top,
  .hsd-bottom {
    &:hover {
      cursor: s-resize;
    }
  }
}
</style>
