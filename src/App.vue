<template>
  <div id="app">
    <!-- <router-view/> -->
    <layout />
  </div>
</template>

<script>
import layout from './views/Container'
export default {
  components: {
    layout
  },
  name: 'App'
}
</script>

<style lang="scss">
/* reset and golab style*/
html,body {
  height: 100%;
  margin: 0;
}
ul, li {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
select {
  &:focus {
    outline: none
  }
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
#app {
  height: 100%;
}
/* element ui reset */
.el-icon-circle-check {
  &.icon-circle-check-custom {
    &::before {
      content: '';
      display: inline-block;
      background-image: url(./assets/images/icons/check-circle-o.png);
      background-size: 28px 28px;
      width: 28px;
      height: 28px;
    }
  }
}
.selected {
  .icon-circle-check-custom {
    &::before {
      background-image: url(./assets/images/icons/check-circle-o-selected.png);
      background-size: 28px 28px;
    }
  }
}
.el-icon-error {
  &.icon-error-custom {
    &:before {
      content: '';
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url(./assets/images/icons/icon-delete2.png) center center no-repeat;
      background-size: 16px 16px;
    }
  }
}
.el-dialog__header {
  padding: 13px 20px;
  font-size: 14px;
  background: #424242;
  color: $white;
  .el-dialog__title {
    font-size: 14px;
    line-height: 1;
    color: $white;
  }
}
.el-dialog__body {
  padding: 20px;
}
.el-dialog__headerbtn {
  top: 14px;
}
.el-message-box {
  border: none;
  .el-message-box__header {
    padding: 13px 20px;
    background: #272727;
    .el-message-box__title {
      font-size: 14px;
      color: $white;
    }
    .el-message-box__headerbtn {
      top: 13px;
    }
  }
  .el-message-box__content {
    margin-top: 30px;
    color: #222;
    .el-message-box__message {
      padding-left: 50px;
    }
  }
  .el-icon-error {
    font-size: 40px !important;
    color: red;
  }
  .el-icon-warning {
    font-size: 40px !important;
    color: red;
  }
  .el-icon-success {
    font-size: 40px !important;
  }
  .el-message-box__btns {
    margin: 10px 0 5px;
    text-align: center;
    button {
      width: 150px;
      height: 40px;
      font-size: 14px;
    }
  }
}
</style>
