<template>
  <div class="tb-item">
    <el-tooltip class="tooltip-item" effect="dark" content="宽" placement="bottom">
      <div class="width">
        宽：<input class="inp" type="text" v-model.lazy="width" @keydown.stop="keydownHandler('width')">
      </div>
    </el-tooltip>
    <el-tooltip class="tooltip-item" effect="dark" content="高" placement="bottom">
      <div>
        高：<input class="inp" type="text" v-model.lazy="height" @keydown.stop="keydownHandler('height')">
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import keymap from '@/assets/js/editor/tool/keymap.js'
import { mapMutations } from 'vuex'
export default {
  name: 'size',
  data () {
    return {
    }
  },
  computed: {
    width: {
      get () {
        return (this.getSingleActiveModule('width') || '')
      },
      set (val) {
        if (val < 80) {
          return
        }
        if (this.getSingleActiveModule('locked') === false) {
          this.updateSize({
            name: name,
            width: val
          })
        }
      }
    },
    height: {
      get () {
        return (this.getSingleActiveModule('height') || '')
      },
      set (val) {
        if (val < 100) {
          return
        }
        if (this.getSingleActiveModule('locked') === false) {
          this.updateSize({
            name: name,
            height: val
          })
        }
      }
    }
  },
  methods: {
    ...mapMutations(['updateSize']),
    keydownHandler (type) {
      let val = this[type]
      if (event.keyCode === keymap('Up')) {
        val++
      } else if (event.keyCode === keymap('Down')) {
        val--
      }
      this[type] = val
      event.stopPropagation()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tb-item {
  margin-right: 10px;
  @include item-topbar();
  .inp {
    @include button-topbar(46px, 24px);
  }
  .tooltip-item {
    display: inline-block;
  }
  .width {
    margin-left: 10px;
  }
}
</style>
