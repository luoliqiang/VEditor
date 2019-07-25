<template>
  <div class="tb-item">
    <el-tooltip class="tooltip-item" effect="dark" content="置于顶层(Ctrl+])" placement="bottom">
      <div class="tb-up" @click="updown('up')" :class="{disabled: disabled }"></div>
    </el-tooltip>
    <el-tooltip class="tooltip-item" effect="dark" content="置于底层(Ctrl+[)" placement="bottom">
      <div class="tb-down" @click="updown('down')" :class="{disabled: disabled}"></div>
    </el-tooltip>
  </div>
</template>

<script>
import { shortCut } from '@/mixins/shortCut.js'
export default {
  name: 'updown',
  mixins: [shortCut],
  computed: {
    disabled () {
      return this.activeUnlockModule().length !== 1
    }
  },
  methods: {
    keyCallback (keyCode, e) {
      if (e.ctrlKey) { // Ctrl+
        if (keyCode === this.keymap(']')) {
          this.updown('up')
          e.preventDefault()
        } else if (keyCode === this.keymap('[')) {
          this.updown('down')
          e.preventDefault()
        }
      }
    },
    updown (type) {
      this.$store.commit('updownComponent', type)
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
.tb-down,
.tb-up {
  display: inline-block;
  margin: 0 5px;
  width: 16px;
  height: 100%;
  background: url(#{$imgPathTopbar}icons/topbar/icon-up.png) center center no-repeat;
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
.tb-down {
  background: url(#{$imgPathTopbar}icons/topbar/icon-down.png) center center no-repeat;
}
</style>
