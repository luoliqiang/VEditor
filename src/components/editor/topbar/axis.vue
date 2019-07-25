<template>
  <div class="tb-item">
    <el-tooltip class="tooltip-item" effect="dark" content="中轴线" placement="bottom">
      <el-checkbox-group v-model="showAxis" size="mini">
        <el-checkbox label="显示中轴线"></el-checkbox>
      </el-checkbox-group>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'axis',
  data () {
    return {
    }
  },
  computed: {
    showAxis: {
      get () {
        return this.storeState.showAxis
      },
      set (val) {
        this.$store.commit('toggleAxis', val)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/deep/ {
  .el-checkbox__inner {
    @include mini-checkbox()
  }
  .el-checkbox__label {
    @include mini-checkbox-label()
  }
  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: #fff !important;
  }
}
.tb-item {
  @include item-topbar();
  select {
    @include button-topbar(auto, 24px);
    margin-left: 5px;
    padding: 0 5px;
    option {
      background: #3e3b3b;
    }
  }
}
</style>
