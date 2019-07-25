<template>
  <div>
    <div class="hsd" v-show="crossline.x" :style="{'top': crossline.x + 'px'}"></div>
    <div class="vert" v-show="crossline.y" :style="{'left': crossline.y + 'px'}"></div>
  </div>
</template>

<script>
export default {
  name: 'crossline',
  data () {
    return {}
  },
  computed: {
    crossline () {
      return this.storeState.crossline
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hsd,
.vert {
  position: absolute;
  z-index: 98;
  top: -1px;
  left: -1px;
}
.hsd {
  width: 100%;
  height: 0;
  border-bottom: 1px solid #00E4FF;
}
.vert {
  width: 0;
  height: 100%;
  border-left: 1px solid #00E4FF;
}
</style>
