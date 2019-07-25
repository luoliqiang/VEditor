<template>
  <div class="tb-item">
    <el-tooltip class="tooltip-item" effect="dark" content="横向" placement="bottom">
      <div>
        x：<input class="inp" type="text" v-model="x" @keydown.stop="keydownHandlerX">
      </div>
    </el-tooltip>
    <el-tooltip class="tooltip-item" effect="dark" content="纵向" placement="bottom">
      <div>
        y：<input class="inp" type="text" v-model="y" @keydown.stop="keydownHandlerY">
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import keymap from '@/assets/js/editor/tool/keymap.js'
import { shortCut } from '@/mixins/shortCut.js'
export default {
  name: 'size',
  mixins: [shortCut],
  data () {
    return {
    }
  },
  computed: {
    x: {
      get () {
        let x
        this.iteratorActiveModule((data) => {
          x = data.x
        }, () => {
          x = ''
        })
        return x
      },
      set (val) {
        this.iteratorActiveModule((data, name) => {
          if (!data.locked) {
            this.$store.commit('updatePos', {
              name: name,
              x: val
            })
          }
        })
      }
    },
    y: {
      get () {
        let y
        this.iteratorActiveModule((data) => {
          y = data.y
        }, () => {
          y = ''
        })
        return y
      },
      set (val) {
        this.iteratorActiveModule((data, name) => {
          if (!data.locked) {
            this.$store.commit('updatePos', {
              name: name,
              y: val
            })
          }
        })
      }
    }
  },
  methods: {
    keyCallback (keyCode, e) {
      if (!e.ctrlKey) {
        if (keyCode === this.keymap('Up')) {
          this.y = this.y - 1
          e.preventDefault()
        } else if (keyCode === this.keymap('Down')) {
          this.y = this.y + 1
          e.preventDefault()
        } else if (keyCode === this.keymap('Left')) {
          this.x = this.x - 1
          e.preventDefault()
        } else if (keyCode === this.keymap('Right')) {
          this.x = this.x + 1
          e.preventDefault()
        }
        this.x = this.x < 0 ? 0 : this.x
        this.y = this.y < 0 ? 0 : this.y
      }
    },
    keydownHandlerX () {
      if (event.keyCode === keymap('Up')) {
        this.x = this.x + 1
      } else if (event.keyCode === keymap('Down')) {
        this.x = this.x - 1
      }
      this.x = this.x < 0 ? 0 : this.x
      event.stopPropagation()
    },
    keydownHandlerY () {
      if (event.keyCode === keymap('Up')) {
        this.y = this.y + 1
      } else if (event.keyCode === keymap('Down')) {
        this.y = this.y - 1
      }
      this.y = this.y < 0 ? 0 : this.y
      event.stopPropagation()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tb-item {
  @include item-topbar();
  @include item-topbar-border();
  padding-right: 10px;
  margin-right: 10px;
  .inp {
    @include button-topbar(46px, 24px);
  }
  .tooltip-item {
    display: inline-block;
  }
}
</style>
