<template>
    <div class="tb-item">
      <el-tooltip class="tooltip-item" effect="dark" content="撤销(Ctrl+Z)" placement="bottom">
        <div @click="undo" class="icon-undo" :class="{disabled: !hasUndo}"></div>
      </el-tooltip>
      <el-tooltip class="tooltip-item" effect="dark" content="恢复(Ctrl+Y)" placement="bottom">
        <div @click="redo" class="icon-redo" :class="{disabled: !hasRedo}"></div>
      </el-tooltip>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { shortCut } from '@/mixins/shortCut.js'
export default {
  name: 'layout',
  mixins: [shortCut],
  data () {
    return {
      msg: ''
    }
  },
  computed: {
    ...mapState(['hasRedo', 'hasUndo'])
  },
  methods: {
    keyCallback (keyCode, e) {
      if (e.ctrlKey) { // Ctrl+
        if (keyCode === this.keymap('Z')) {
          this.undo()
          e.preventDefault()
        } else if (keyCode === this.keymap('Y')) {
          this.redo()
          e.preventDefault()
        }
      }
    },
    undo () {
      this.$store.history.undo()
    },
    redo () {
      this.$store.history.redo()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tb-item {
  @include item-topbar();
  @include item-topbar-border();
  padding: 0 6px;
  > div {
    display: inline-block;
  }
  .icon-redo,
  .icon-undo {
    display: inline-block;
    margin: 0 5px;
    width: 16px;
    height: 100%;
    background: url(../../../assets/images/icons/topbar/icon-undo.png) center center no-repeat;
    &:hover {
      opacity: 1;
    }
    &.disabled {
      opacity: .4;
      &:hover {
        opacity: .4;
      }
    }
  }
  .icon-redo {
    background: url(../../../assets/images/icons/topbar/icon-redo.png) center center no-repeat;
  }
}
</style>
