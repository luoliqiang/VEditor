<template>
    <div id="main" :style="containerStyle">
      <!-- 模块组件 -->
        <div
          v-for="(item, name) in storeState"
          v-if="isModule(name)"
          :key="name"
          v-drag="name"
          class="component"
          :class="{active: isActive(name)}"
          :style="compStyle(item)">
          <component
            v-bind:is="name && name.split('-')[1]"
            :state="item"
            :module-name="name">
          </component>
        </div>
      <!-- 选中框 -->
      <comp-outer></comp-outer>
      <!-- 对齐线 -->
      <crossline></crossline>
      <!-- 中轴线 -->
      <axis></axis>
      <!-- 右键热键 -->
      <contextmenu></contextmenu>
      <!-- 选择区 -->
      <select-area></select-area>
      <!-- 富文本编辑器 -->
      <text-editor></text-editor>
    </div>
</template>

<script>
import compMenu from '../components/editor/compMenu.vue'
import compOuter from '../components/editor/compOuter.vue'
import crossline from '../components/editor/crossline.vue'
import menuAxis from '../components/editor/topbar/axis.vue'
import axis from '../components/editor/axis.vue'
import contextmenu from '../components/editor/contextmenu.vue'
import selectArea from '../components/editor/selectArea.vue'
import coustom from '../components/coustom.vue'
import textEditor from '../components/textEditor.vue'

export default {
  name: 'Aside',
  components: {
    compMenu,
    crossline,
    axis,
    contextmenu,
    menuAxis,
    selectArea,
    compOuter,
    coustom,
    textEditor
  },
  computed: {
    containerStyle () {
      const state = this.storeState
      const resolutionArr = state.resolution && state.resolution.split('*')

      let styles = {}
      if (resolutionArr) { // 有分辨率
        styles.width = resolutionArr[0] + 'px'
        styles.height = resolutionArr[1] + 'px'
      }

      return styles
    }
  },
  methods: {
    isModule (name) {
      return name.indexOf('module-') === 0
    },
    compStyle (item) {
      return {
        left: item.x + 'px',
        top: item.y + 'px',
        zIndex: item.zIndex,
        width: item.width + 'px',
        height: item.height + 'px'
      }
    },
    isActive (name) {
      let activeName = this.activeModuleName
      return (activeName === name || (Array.isArray(activeName) && activeName.indexOf(name) >= 0))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.component {
  position: absolute;
  box
  .menu {
    position: absolute;
    top: 0;
    left: -60px;
    color: #fff;
  }
}
#main {
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
