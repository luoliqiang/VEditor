<template>
  <el-header>
    <span class="title">VEditor</span>
    <!-- 分辨率 -->
    <resolution></resolution>
    <!-- 撤销前进 -->
    <reundo></reundo>
    <!-- 置顶置底 -->
    <updown></updown>
    <!-- 对齐 -->
    <align></align>
    <!-- 锁定解锁 -->
    <lock></lock>
    <!-- 宽高 -->
    <size></size>
    <!-- 坐标 -->
    <position></position>
    <!-- 中轴线 -->
    <menu-axis></menu-axis>
    <!-- 退出 -->
    <exit></exit>
    <!-- 保存 -->
    <save></save>
    <!-- 全屏 -->
    <fullscreen></fullscreen>
  </el-header>
</template>

<script>
import resolution from '../components/editor/topbar/resolution.vue'
import reundo from '../components/editor/topbar/reundo.vue'
import updown from '../components/editor/topbar/updown.vue'
import align from '../components/editor/topbar/align.vue'
import lock from '../components/editor/topbar/lock.vue'
import size from '../components/editor/topbar/size.vue'
import position from '../components/editor/topbar/position.vue'
import menuAxis from '../components/editor/topbar/axis.vue'
import fullscreen from '../components/editor/topbar/fullscreen.vue'
import save from '../components/editor/topbar/save.vue'
import exit from '../components/editor/topbar/exit.vue'
export default {
  name: 'Aside',
  components: {
    resolution,
    reundo,
    updown,
    align,
    lock,
    size,
    position,
    menuAxis,
    fullscreen,
    save,
    exit
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-header {
  min-width: 1500px;
  height: 48px !important;
  background: #111112;
  text-align: left;
  font-size: 12px;
  color:  #C2C2C2;
  .title {
    margin-right: 20px;
    line-height: 48px;
    font-size: 15px;
    color: #fff;
  }
}
</style>
