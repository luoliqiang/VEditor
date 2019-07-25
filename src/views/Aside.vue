<template>
  <transition name="slide">
    <el-aside id="aside" width="100px" :style="{marginLeft: folder ? '-100px' : '0'}">
      <div class="txt">侧边栏</div>
      <div class="btn-folder"
        @click="folder = !folder"
        :class="{isfolder: folder}"
        :title="folder ? '展开' : '收起'">
        <i class="el-icon-arrow-left"></i>
      </div>
      <coustom></coustom>
    </el-aside>
  </transition>
</template>

<script>
import coustom from '../components/editor/leftbar/coustom.vue'
export default {
  name: 'Aside',
  components: {
    coustom
  },
  data () {
    return {
      folder: false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-aside {
  position: relative;
  height: 100%;
  font-size: 12px;
  color: #BABABA;
  background: rgba(3,3,4,0.86);
  overflow: visible;
  transition: all .6s ease;
  .btn-folder {
    position: absolute;
    top: 50%;
    right: -14px;
    width: 14px;
    height: 31px;
    line-height: 31px;
    z-index: 99;
    text-align: center;
    opacity: 0.8;
    border-radius: 0 6px 6px 0;
    background: rgba(82,82,82,0.6);
    transition: transform .6s ease;
    cursor: pointer;
    &:hover {
      color: #fff;
      background: rgba(82,82,82, 1);
    }
    &.isfolder /deep/ .el-icon-arrow-left {
      transform: rotate(180deg);
    }
  }
  .txt {
    border-top: 2px solid #040404;
    padding: 5px 0;
    text-align: center;
    background: #131313;
  }
}
</style>
