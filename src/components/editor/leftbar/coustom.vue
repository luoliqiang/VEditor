<template>
  <div class="item" v-pick="'coustom'">
    <i class="icon-coustom"></i>
    自定义
  </div>
</template>

<script>
export default {
  name: 'coustom',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    back () {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.item {
  @include item-leftbar();
  .icon-coustom {
    display: block;
    margin: 0 auto 10px;
    width: 30px;
    height: 30px;
    background: url(#{$imgPathLeftbar}icons/leftbar/icon-coustom.png) no-repeat center top;
  }
}
</style>
