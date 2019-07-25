<template>
  <div
    class="selectArea"
    v-show="selectArea.show"
    :style="{
      'top': (selectArea.y < selectArea.by ? selectArea.y : selectArea.by) + 'px',
      'left': (selectArea.x < selectArea.rx ? selectArea.x : selectArea.rx) + 'px',
      'width': Math.abs(selectArea.rx - selectArea.x) + 'px',
      'height': Math.abs(selectArea.by - selectArea.y) + 'px'}">
  </div>
</template>

<script>
export default {
  name: 'selectArea',
  data () {
    return {}
  },
  created () {
  },
  computed: {
    selectArea () {
      return this.storeState.selectArea
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.selectArea {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 200px;
  border: 1px dashed #fff;
  background: rgba(255,255,255,.2);
}
</style>
