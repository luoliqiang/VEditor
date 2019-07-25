<template>
  <div class="tb-item" @click="handleExit">
    <i class="icon-exit"></i>退出
  </div>
</template>

<script>
import { storage } from '@/assets/js/editor/tool/util'
export default {
  name: 'exit',
  mounted () {
    // vue组件由子组件开始渲染
    setTimeout(() => {
      this.$editor.listenser.on({
        name: 'exit',
        callback: this.exit
      })
    }, 0)
  },
  methods: {
    handleExit () {
      // 判断是否做了修改
      if (storage.get('lastModify') !== JSON.stringify(this.$store.history.getCurdo())) {
        this.$confirm('当前操作还未保存，直接关闭将会丢失所有修改', '提示', {
          type: 'error',
          confirmButtonText: '保存修改',
          cancelButtonText: '直接退出'
        }).then(() => { // 保存修改
          this.$editor.listenser.fire('handleSave')
        }).catch(action => { // 直接关闭
          this.exit()
        })
      } else {
        this.exit()
      }
    },
    exit () {
      if (window.opener) {
        window.opener.location.reload()
        window.opener = null
      }
      window.close()
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
.icon-exit {
  display: inline-block;
  margin: 2px 5px;
  width: 18px;
  height: 18px;
  vertical-align: -6px;
  background: url(#{$imgPathTopbar}icons/topbar/icon-exit.png) center center no-repeat;
}
</style>
