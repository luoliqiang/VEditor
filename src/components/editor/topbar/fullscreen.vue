<template>
  <div class="tb-item" @click="toggleFullscreen">
    <i class="icon-fullscreen"></i>
    {{ isFullscreen ? '退出全屏' : '全屏' }}
  </div>
</template>

<script>
export default {
  name: 'fullscreen',
  data () {
    return {
      isFullscreen: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$editor.listenser.on({
        name: 'exitFullScreen',
        callback: () => {
          this.isFullscreen = false
        }
      })
      this.$editor.listenser.on({
        name: 'entryfullScreen',
        callback: () => {
          this.isFullscreen = true
        }
      })
    })
  },
  methods: {
    toggleFullscreen () {
      let isFullscreen = document.webkitIsFullScreen
      let doc = document.getElementsByTagName('body')[0]
      if (!isFullscreen) {
        doc.webkitRequestFullScreen()
        this.isFullscreen = true
      } else {
        document.webkitExitFullscreen()
        this.isFullscreen = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tb-item {
  float: right;
  margin: 0 5px;
  @include item-topbar();
  opacity: .6;
  &:hover {
    opacity: 1;
  }
}
.icon-notfullscreen,
.icon-fullscreen {
  display: inline-block;
  margin: 2px 5px;
  width: 18px;
  height: 18px;
  vertical-align: -6px;
  background: url(#{$imgPathTopbar}icons/topbar/icon-fullscreen.png) center center no-repeat;
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
.notfullscreen {
  background: url(#{$imgPathTopbar}icons/topbar/icon-exit-fullscreen.png) center center no-repeat;
}
</style>
