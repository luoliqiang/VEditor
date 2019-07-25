<template>
  <div class="component-contextmenu">
    <div class="icon-del" @click="del" title="删除" v-show="hasItem('del')"></div>
  </div>
</template>

<script>
import { deleteModule } from '@/store/dealModule.js'
export default {
  name: 'compmenu',
  props: ['menuItems'],
  data () {
    return {}
  },
  methods: {
    hasItem (name) {
      if (!this.menuItems) {
        return true
      } else {
        return this.menuItems.split('|').indexOf(name) >= 0
      }
    },
    del () {
      deleteModule()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.component-contextmenu {
  position: absolute;
  top: -6px;
  left: -38px;
  width: 32px;
  background: rgba(0,0,0,0.7);
}
.icon-del {
  width: 100%;
  height: 30px;
  cursor: pointer;
  &:hover {
    opacity: .8;
  }
}
.icon-del {
  background: url(#{$imgPath}icons/icon-delete.png) center center no-repeat;
}
</style>
