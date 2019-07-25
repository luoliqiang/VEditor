<template>
  <div class="tb-item">
    <el-tooltip class="tooltip-item" effect="dark" content="锁定(Ctrl+L)" placement="bottom">
      <div class="tb-lock" @click="lock('lock')" :class="{disabled: disabledLock}" ></div>
    </el-tooltip>
    <el-tooltip class="tooltip-item" effect="dark" content="解锁(Ctrl+Shift+L)" placement="bottom">
    disabledUnlock () {
      <div class="tb-unlock" @click="lock('unlock')" :class="{disabled: disabledUnlock}"></div>
    </el-tooltip>
  </div>
</template>

<script>
import { shortCut } from '@/mixins/shortCut.js'
export default {
  name: 'lock',
  mixins: [shortCut],
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    disabledLock () {
      return this.activeUnlockModule().length !== 1
    },
    disabledUnlock () {
      return (this.iteratorActiveModule().length - this.activeUnlockModule().length) !== 1
    }
  },
  methods: {
    keyCallback (keyCode, e) {
      if (e.ctrlKey && keyCode === this.keymap('L')) { // Ctrl+
        if (e.shiftKey) {
          this.lock('unlock')
        } else {
          this.lock('lock')
        }
        e.preventDefault()
      }
    },
    lock (type) {
      if (this.disabledLock && type === 'lock') {
        return
      }
      if (this.disabledUnlock && type === 'unlock') {
        return
      }
      if (this.activeModuleName) {
        this.$store.commit('lock', type)
      }
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
.tb-unlock,
.tb-lock {
  display: inline-block;
  margin: 0 5px;
  width: 16px;
  height: 100%;
  background: url(#{$imgPathTopbar}icons/topbar/icon-lock.png) center center no-repeat;
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
.tb-unlock {
  background: url(#{$imgPathTopbar}icons/topbar/icon-unlock.png) center center no-repeat;
}
</style>
