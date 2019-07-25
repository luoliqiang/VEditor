<template>
  <div class="tb-item">
    <template v-if="active">
      <el-dropdown trigger="click" placement="bottom-start"  @command="align">
        <el-tooltip class="tooltip-item" effect="dark" content="对齐" placement="bottom">
          <span class="tb-align"></span>
        </el-tooltip>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="left">
            <i class="icon-align icon-align-left"></i>
            左对齐
          </el-dropdown-item>
          <el-dropdown-item command="center">
            <i class="icon-align icon-align-center"></i>
            左右居中
          </el-dropdown-item>
          <el-dropdown-item command="right">
            <i class="icon-align icon-align-right"></i>
            右对齐
          </el-dropdown-item>
          <el-dropdown-item command="top" divided>
            <i class="icon-align icon-align-top"></i>
            顶部对齐
          </el-dropdown-item>
          <el-dropdown-item command="middle">
            <i class="icon-align icon-align-middle"></i>
            上下居中
          </el-dropdown-item>
          <el-dropdown-item command="bottom">
            <i class="icon-align icon-align-bottom"></i>
            底部对齐
          </el-dropdown-item>
          <el-dropdown-item command="justify" divided>
            <i class="icon-align icon-align-justify"></i>
            水平分布
          </el-dropdown-item>
          <el-dropdown-item command="vertical">
            <i class="icon-align icon-align-vertical"></i>
            垂直分布
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </template>
    <template v-else>
      <el-tooltip class="tooltip-item" effect="dark" content="对齐" placement="bottom">
        <span class="tb-align disabled"></span>
      </el-tooltip>
    </template>
  </div>
</template>

<script>
import { minimum } from '@/assets/js/editor/tool/util.js'
export default {
  name: 'updown',
  computed: {
    active () {
      let activeModuleName = this.activeModuleName
      if (activeModuleName && Array.isArray(activeModuleName) && activeModuleName.length > 1) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    updown (type) {
      this.$store.commit('updownComponent', type)
    },
    updatePos (name, x, y) {
      let pos = {
        name: name
      }
      if (x) {
        pos.x = x
      }
      if (y) {
        pos.y = y
      }
      this.$store.commit('updatePos', pos)
    },
    align (type) {
      let modules = this.activeUnlockModule()
      let fun
      switch (type) {
        case 'left':
          fun = () => {
            let alignX = minimum('x', modules)
            this.iteratorActiveModule((data, name) => {
              this.updatePos(name, alignX)
            })
          }
          break
        case 'center':
          fun = () => {
            let minX
            let maxX
            this.iteratorActiveModule((data, name) => {
              let rightX = data.x + data.width
              if (!minX || data.x < minX) {
                minX = data.x
              }
              if (!maxX || rightX > maxX) {
                maxX = rightX
              }
            })

            this.iteratorActiveModule((data, name) => {
              let centerX = minX + (maxX - minX) / 2
              this.updatePos(name, centerX - data.width / 2)
            })
          }
          break
        case 'right':
          fun = () => {
            let maxX
            this.iteratorActiveModule((data, name) => {
              if (!data.locked) {
                let rightX = data.x + data.width
                if (!maxX || rightX > maxX) {
                  maxX = rightX
                }
              }
            })
            this.iteratorActiveModule((data, name) => {
              this.updatePos(name, maxX - data.width)
            })
          }
          break
        case 'top':
          fun = () => {
            let alignY = minimum('y', modules)
            this.iteratorActiveModule((data, name) => {
              this.updatePos(name, null, alignY)
            })
          }
          break
        case 'middle':
          fun = () => {
            let minY
            let maxY
            this.iteratorActiveModule((data, name) => {
              let bottomY = data.y + data.height
              if (!minY || data.y < minY) {
                minY = data.y
              }
              if (!maxY || bottomY > maxY) {
                maxY = bottomY
              }
            })

            this.iteratorActiveModule((data, name) => {
              let centerY = minY + (maxY - minY) / 2
              this.updatePos(name, null, centerY - data.height / 2)
            })
          }
          break
        case 'bottom':
          fun = () => {
            let maxY
            this.iteratorActiveModule((data, name) => {
              let bottomY = data.y + data.height
              if (!maxY || bottomY > maxY) {
                maxY = bottomY
              }
            })

            this.iteratorActiveModule((data, name) => {
              let bottomY = maxY - data.height
              this.updatePos(name, null, bottomY)
            })
          }
          break
        case 'vertical':
          fun = () => {
            let modules = this.activeUnlockModule()
            let len = modules.length
            let startY
            let gap
            let idx = 0

            if (len < 3) {
              return
            }
            modules.sort((a, b) => {
              return a.y > b.y
            })
            startY = modules[0].y + modules[0].height / 2
            // // 等分间距
            gap = ((modules[len - 1].y + modules[len - 1].height / 2) - startY) / (len - 1)

            this.iteratorActiveModule((data, name) => {
              if (!data.locked) {
                if (idx !== 0 && idx !== len - 1) {
                  let y = startY + gap * idx - data.height / 2
                  this.updatePos(name, null, y)
                }
                idx++
              }
            })
          }
          break
        case 'justify':
          fun = () => {
            let modules = this.activeUnlockModule()
            let len = modules.length
            let startX
            let gap
            let idx = 0

            if (len < 3) {
              return
            }
            modules.sort((a, b) => {
              return a.x > b.x
            })
            startX = modules[0].x + modules[0].width / 2
            // // 等分间距
            gap = ((modules[len - 1].x + modules[len - 1].width / 2) - startX) / (len - 1)

            this.iteratorActiveModule((data, name) => {
              if (!data.locked) {
                if (idx !== 0 && idx !== len - 1) {
                  let x = startX + gap * idx - data.width / 2
                  this.updatePos(name, x)
                }
                idx++
              }
            })
          }
          break
      }

      fun()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tb-item {
  @include item-topbar();
  @include item-topbar-border();
}
.tb-align {
  display: inline-block;
  margin: 2px 5px;
  width: 22px;
  height: 20px;
  background: url(#{$imgPathTopbar}icons/topbar/icon-align-normal.png) center center no-repeat;
  &.disabled {
    opacity: .4;
    &:hover {
      opacity: .4;
    }
  }
  &:hover {
    opacity: 1;
  }
}
.el-dropdown-menu {
  margin: 6px 0 0 -45px;
  border: 1px solid #424242;
  background: #1A191C;
  border-radius: 4px;
  font-size: 12px;
}
.el-dropdown-menu__item {
  margin: 0 10px;
  padding: 0 10px;
  height: 28px;
  line-height: 28px;
  font-size: 12px;
  color: #C2C2C2;
  &:hover {
    color: #fff;
    background: #1A191C;
    .icon-align {
      opacity: 1;
    }
  }
}
/deep/ {
  .popper__arrow {
    display: none;
  }
  .popper__arrow::after {
    display: none;
  }
  .el-dropdown-menu__item--divided {
    border-top: none;
  }
  .el-dropdown-menu__item--divided:before {
    margin: 0 -7px;
    height: 1px;
    width: 90px;
    background: #2A2A2A;
  }
}
.icon-align {
  display: inline-block;
  width: 20px;
  height: 20px;
  opacity: .6;
  vertical-align: -6px;
}
.icon-align-left {
  background: url(#{$imgPathTopbar}icons/topbar/align-left.png) center center no-repeat;
}
.icon-align-center {
  background: url(#{$imgPathTopbar}icons/topbar/align-center.png) center center no-repeat;
}
.icon-align-right {
  background: url(#{$imgPathTopbar}icons/topbar/align-right.png) center center no-repeat;
}
.icon-align-top {
  background: url(#{$imgPathTopbar}icons/topbar/align-top.png) center center no-repeat;
}
.icon-align-justify {
  background: url(#{$imgPathTopbar}icons/topbar/algin-justify.png) center center no-repeat;
}
.icon-align-bottom {
  background: url(#{$imgPathTopbar}icons/topbar/align-bottom.png) center center no-repeat;
}
.icon-align-middle {
  background: url(#{$imgPathTopbar}icons/topbar/align-middle.png) center center no-repeat;
}
.icon-align-vertical {
  background: url(#{$imgPathTopbar}icons/topbar/align-vertical.png) center center no-repeat;
}
</style>
