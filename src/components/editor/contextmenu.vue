<template>
  <div class="contextmenu" v-show="contextmenu.show" :style="{'top': contextmenu.y + 'px', 'left': contextmenu.x + 'px'}">
    <ul>
      <li @mousedown.stop="up" v-show="contextmenu.componentName && !locked">置于顶层</li>
      <li @mousedown.stop="down" v-show="contextmenu.componentName && !locked">置于底层</li>
      <li @mousedown.stop="lock" v-show="contextmenu.componentName && !locked">锁定</li>
      <li @mousedown.stop="unlock" v-show="contextmenu.componentName && locked">解锁</li>
      <li @mousedown.stop="del" v-show="contextmenu.componentName">删除</li>
      <li @mousedown.stop="selectAll">全选</li>
    </ul>
  </div>
</template>

<script>
import { deleteModule } from '@/store/dealModule.js'
import keymap from '@/assets/js/editor/tool/keymap.js'
export default {
  name: 'axis',
  data () {
    return {}
  },
  computed: {
    contextmenu () {
      return this.storeState.contextmenu
    },
    locked () {
      let moduleName = this.contextmenu.componentName
      if (moduleName && this.storeState[moduleName]) {
        return this.storeState[moduleName].locked
      } else {
        return false
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$editor.listenser.on({
        name: 'keydown',
        callback: (keyCode, e) => {
          if (e.ctrlKey && keyCode === keymap('A')) { // Ctrl + A
            this.selectAll()
          }
        }
      })
    })
  },
  methods: {
    hide () {
      this.$store.commit('visibleContextmenu', {show: false})
    },
    up () {
      this.$store.commit('updownComponent', 'up')
      this.hide()
    },
    down () {
      this.$store.commit('updownComponent', 'down')
      this.hide()
    },
    lock () {
      if (this.getSingleActiveModule()) {
        this.$store.commit('lock', 'lock')
      }
      this.hide()
    },
    unlock () {
      if (this.getSingleActiveModule()) {
        this.$store.commit('lock', 'unlock')
      }
      this.hide()
    },
    del () {
      deleteModule(this.activeModuleName)
      this.hide()
    },
    selectAll () {
      let moduleArr = []
      this.iteratorModule((item, name) => {
        moduleArr.push(name)
      })
      if (moduleArr.length > 1) {
        this.$store.commit('activeModule', moduleArr)
      } else if (moduleArr.length === 1) {
        this.$store.commit('activeModule', moduleArr[0])
      }
      this.hide()
    },
    setWALL () {
      this.$store.commit('visibleDialogWall', true)
      this.hide()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.contextmenu {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 220px;
  background: #fff;
  overflow: hidden;
  font-size: 12px;
  border-radius: 6px;
  li {
    margin: 5px 0;
    padding: 5px 10px;
    &:hover {
      background: #0076FF;
      color: #fff;
    }
  }
}
</style>
