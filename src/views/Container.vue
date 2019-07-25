<template>
  <el-container class="is-vertical">
      <Header></Header>
    <el-container :style="{height: height + 'px'}">
      <Aside></Aside>
      <el-main :style="{width: width - 100 + 'px'}">
        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { debounce, storage } from '@/assets/js/editor/tool/util.js'
import Aside from './Aside.vue'
import Header from './Header.vue'
import Main from './Main.vue'

export default {
  name: 'layout',
  components: {
    Aside,
    Main,
    Header
  },
  data () {
    return {
      height: '100%',
      width: '100%'
    }
  },
  mounted () {
    const history = this.$store.history

    this.resize()
    window.addEventListener('resize', () => {
      debounce.bind(this)(this.resize)
    })
    // 初始化关闭
    window.addEventListener('beforeunload', (e) => {
      if (this.isModify()) {
        let eve = window.event || e
        let msg = '确定离开当前页面吗？未保存的内容或将丢失！'
        eve.returnValue = msg
        return msg
      }
    })
    history.update()
    storage.save('lastModify', JSON.stringify(history.getCurdo()))
  },
  methods: {
    resize () {
      this.width = document.body.clientWidth
      this.height = document.body.clientHeight
    },
    isModify () {
      // 判断是否做了修改
      return storage.get('lastModify') !== JSON.stringify(this.$store.history.getCurdo())
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-container {
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  user-select: none;
  overflow: hidden;
}
.el-main {
  padding: 0;
  height: 100% !important;
  background: #3e3b3b;
  @include scrollbar(8px);
}
</style>
