<template>
  <div class="component-coustom">
    <comp-menu
      v-show="showMenu"
      :menuItems="'del'">
    </comp-menu>

    <div class="inner">
      <!-- ql-editor类名必须存在v-html的上层  -->
      <div
        class="title ql-editor" title="双击设置标题"
        @dblclick="showTextEditor"
        v-html="title || '双击设置标题'">
      </div>
    </div>
  </div>
</template>

<script>
import compMenu from './editor/compMenu.vue'
import { mixinHoverActive } from '@/mixins/hoverActive.js'
import 'quill/dist/quill.snow.css' // 必须引入该css
export default {
  name: 'coustom',
  components: {
    compMenu
  },
  mixins: [mixinHoverActive],
  props: ['state', 'moduleName'],
  data () {
    return {}
  },
  computed: {
    title () {
      return this.state.textEditorContent
    },
    iconList (val, oldVal) {
      return this.state.selectedIcons
    }
  },
  methods: {
    setting () {
      this.$store.commit('toggleIconsSettingVisible', true)
    },
    showTextEditor () {
      this.$store.commit('toggleEditorVisible', true)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.component-coustom {
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.15);
  .inner {
    padding: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    box-sizing: border-box;
  }
  .menu {
    position: absolute;
    top: 0;
    left: -60px;
    color: #fff;
  }
  .title {
    margin: -10px -10px 0 -10px;
    padding: 0;
    line-height: 40px;
    height: 40px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    flex-basis: 40px;
    flex-shrink: 0;
    flex-grow: 0;
    overflow: hidden;
  }
}
</style>
