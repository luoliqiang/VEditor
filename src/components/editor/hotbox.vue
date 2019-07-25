<template>
  <div class="hotbox" v-show="hotbox.show" :style="{'top': hotbox.y + 'px', 'left': hotbox.x + 'px'}">
    <ul>
      <li @click="up" v-show="hotbox.type !== 'empty'">置于顶层</li>
      <li @click="down" v-show="hotbox.type !== 'empty'">置于底层</li>
      <li @click="lock" v-show="hotbox.type !== 'empty'">锁定</li>
      <li @click="del" v-show="hotbox.type !== 'empty'">删除</li>
      <li @click="selectAll">全选</li>
    </ul>
  </div>
</template>

<script>
import { deleteModule } from '@/store/dealModule.js'
export default {
  name: 'axis',
  data () {
    return {}
  },
  computed: {
    hotbox () {
      return this.storeState.hotbox
    }
  },
  methods: {
    up () {
      this.$store.commit('updownComponent', 'up')
    },
    down () {
      this.$store.commit('updownComponent', 'down')
    },
    lock () {
      if (this.getSingleActiveModule()) {
        this.$store.commit('lock', 'lock')
      }
    },
    del () {
      deleteModule(this.activeModuleName)
    },
    selectAll () {
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hotbox {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 200px;
  background: #fff;
}
</style>
