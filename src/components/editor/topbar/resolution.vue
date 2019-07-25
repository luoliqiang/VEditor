<template>
  <div class="tb-item">
    分辨率
    <div class="dropdown">
      <div v-if="noEdit">
        <el-tooltip class="tooltip-item" effect="dark" content="模板已经启用，不可修改分辨率" placement="bottom">
          <span class="el-dropdown-link" @click="visible = !visible">
            {{ resolution }}<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
        </el-tooltip>
      </div>
      <span v-else class="el-dropdown-link" @click="visible = !visible">
        {{ resolution }}<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>

      <div class="dropdown-menu" v-show="visible && !noEdit" @mousedown.stop @click.stop>
        <div class="dropdown-item" v-for="(item, idx) in resolutionList" :key="idx" @click="selectResolution(item)">
          <i v-if="resolution === item && !isCoustom" class="el-icon-check"></i>{{ item }}
        </div>
        <div class="dropdown-item">
          <i v-if="isCoustom" class="el-icon-check"></i>
          <div @click="selectCoustom">{{ resolutionCoustom ? resolutionCoustom : '自定义' }}</div>
          <i v-if="resolutionCoustom" class="el-icon-edit" @click.stop.prevent="coustomVisible = 'show'"></i>
          <div class="coustom" v-show="coustomVisible">
            <el-row :gutter="20">
              <el-col :span="6"><el-input v-model="width" placeholder="宽度" type="number"></el-input></el-col>
              <el-col :span="1">*</el-col>
              <el-col :span="6"><el-input v-model="height" placeholder="高度" type="number"></el-input></el-col>
              <el-col :span="8"><el-button type="primary" size="mini" @click="coustomSave">确定</el-button></el-col>
            </el-row>
            <div class="tip">只能输入整数，单位为px<br>宽度：1176-4098，高度：664-2160</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'resolution',
  data () {
    return {
      resolutionList: ['1920*1080', '1680*1050', '1440*900', '2560*1440'],
      visible: false,
      width: '',
      height: '',
      coustomVisible: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.$editor.listenser.on({
        name: 'mousedown',
        callback: () => {
          this.visible = false
          this.coustomVisible = false
        }
      })
    }, 0)
  },
  computed: {
    noEdit () {
      return this.storeState.editData.state === 1
    },
    resolution: {
      get () {
        return this.storeState.resolution
      },
      set (val) {
        this.changeResolution({
          resolution: val,
          resolutionIsCoustom: this.isCoustom,
          resolutionCoustom: this.resolutionCoustom
        })
      }
    },
    isCoustom: {
      get () {
        return this.storeState.resolutionIsCoustom
      },
      set (val) {
        this.changeResolution({
          resolution: this.resolution,
          resolutionIsCoustom: val,
          resolutionCoustom: this.resolutionCoustom
        })
      }
    },
    resolutionCoustom: {
      get () {
        return this.storeState.resolutionCoustom
      },
      set (val) {
        this.changeResolution({
          resolution: this.resolution,
          resolutionCoustom: val,
          resolutionIsCoustom: this.isCoustom
        })
      }
    }
  },
  methods: {
    ...mapMutations(['changeResolution']),
    selectCoustom () {
      if (!this.resolutionCoustom) {
        this.coustomVisible = true
      } else {
        this.isCoustom = true
        this.resolution = this.resolutionCoustom
        this.coustomVisible = false
        this.hideDropdown()
      }
    },
    hideDropdown () {
      this.coustomVisible = false
      this.visible = false
    },
    selectResolution (val) {
      this.isCoustom = false
      this.resolution = val
      this.hideDropdown()
    },
    coustomSave () {
      if (!this.width || !this.height) {
        this.$message.error('请设置宽高！')
        return
      }
      if (this.width < 1176 || this.height < 664 || this.width > 4098 || this.height > 2160) {
        this.$message.error('请合理设置宽高！')
        return
      }
      this.resolution = `${this.width}*${this.height}`
      this.resolutionCoustom = this.resolution
      this.isCoustom = true
      this.hideDropdown()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
  .el-dropdown-link {
    display: inline-block;
    width: 100px;
    height: 24px;
    background: #1A191C;
    padding: 0 5px;
    box-sizing: border-box;
    font-size: 12px;
    border: 1px solid #3E3E3E;
    border-radius: 2px;
    color: $txt-menu;
    .el-icon--right {
      margin-top: 3px;
      float: right;
      font-size: 16px;
    }
  }
}
.tip {
  margin-top: 10px;
  line-height: 1.5;
  font-size: 12px;
  color: #5C5C5C;
  width: 150%;
  transform: scale(.9);
  margin: 8px 0 0 -14px;
}
.dropdown {
  margin-left: 4px;
  display: inline-block;
  position: relative;
  .dropdown-menu {
    position: absolute;
    top: 25px;
    left: 0;
    z-index: $zIndexTopbar;
    margin: 6px 0 0 0px;
    border: 1px solid #424242;
    background: #1A191C;
    border-radius: 4px;
    font-size: 12px;
  }
  .dropdown-item {
    position: relative;
    width: 90px;
    margin: 0 10px;
    padding: 0 10px 0 20px;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    color: #C2C2C2;
    color: pointer;
    .el-icon-edit,
    .el-icon-check {
      position: absolute;
      top: 8px;
      left: 1px;
      margin-right: 5px;
      font-size: 14px;
    }
    .el-icon-edit {
      top: 8px;
      left: auto;
      right: 10px;
      font-size: 14px;
    }
    &:hover {
      color: #fff;
      background: #1A191C;
      .icon-align {
        opacity: 1;
      }
    }
  }
  .coustom {
    position: absolute;
    top: 0px;
    left: 129px ;
    width: 193px;
    height: 76px;
    background: #1A191C;
    border: 1px solid #424242;
    border-radius: 4px;
    padding: 10px;
    overflow: hidden;
    /deep/ {
      .el-col {
        text-align: center;
      }
      .el-button {
        margin-left: 5px;
        padding: 0;
        width: 48px;
        height: 22px;
        background: #0076FF;
        border-radius: 2px;
      }
      input {
        width: 42px;
        padding: 0;
        height: 22px;
        font-size: 12px;
        color: #c2c2c2;
        line-height: 12px;
        background: #292929;
        text-align: center;
        border: none;
        border-radius: 0;
        &::-webkit-input-placeholder {
          color:#5C5C5C;
        }
      }
    }
  }
}
/deep/ {
  .popper__arrow {
    display: none;
  }
  .popper__arrow::after {
    display: none;
  }
  .el-dropdown-menu__item--divided {
    border-top: none;
  }
  .el-dropdown-menu__item--divided:before {
    margin: 0 -7px;
    height: 1px;
    width: 90px;
    background: #2A2A2A;
  }
}
</style>
