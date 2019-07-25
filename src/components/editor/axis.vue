<template>
  <div v-show="showAxis">
    <div class="axis-hsd"></div>
    <div class="axis-vert"></div>
  </div>
</template>

<script>
export default {
  name: 'axis',
  computed: {
    showAxis () {
      return this.storeState.showAxis
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.axis-hsd,
.axis-vert {
  position: absolute;
  z-index: 98;
  top: 50%;
  left: 50%;
}
.axis-hsd {
  width: 100%;
  left: 0;
  height: 0;
  border-bottom: 1px solid #00E4FF;
}
.axis-vert {
  width: 0;
  top: 0;
  height: 100%;
  border-left: 1px solid #00E4FF;
}
</style>
