<template>
  <div id="header-icon-save" class="tb-item" @click="handleSave">
    <el-tooltip class="tooltip-item" effect="dark" content="保存(Ctrl+S)" placement="bottom">
      <i class="icon-save"></i>
    </el-tooltip>保存
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import canvas2image from '@/assets/js/canvas2image'
import { storage } from '@/assets/js/editor/tool/util'
import { shortCut } from '@/mixins/shortCut.js'

var loading

export default {
  name: 'updown',
  mixins: [shortCut],
  data () {
    return {}
  },
  mounted () {
    // vue组件由子组件开始渲染
    setTimeout(() => {
      this.$editor.listenser.on({
        name: 'handleSave',
        callback: this.handleSave
      })
    }, 0)
  },
  methods: {
    isModify () {
      // 判断是否做了修改
      return storage.get('lastModify') !== JSON.stringify(this.$store.history.getCurdo())
    },
    keyCallback (keyCode, e) {
      if (e.ctrlKey && keyCode === this.keymap('S')) { // Ctrl+
        this.handleSave()
        e.preventDefault()
      }
    },
    saveLcok () { // 设置阀值1s保存一次
      clearTimeout(this.saveLockTimer)
      this.saveLockTimer = setTimeout(() => {
        this.saveLock = false
      }, 1000)

      if (this.saveLock) {
        return true
      } else {
        this.saveLock = true
        return false
      }
    },
    checkDownload () {
      if (this.isModify()) {
        let storeKeys = Object.keys(this.storeState)
        if (storeKeys.length && storeKeys.indexOf('module-downloadArea') === -1 && this.storeState.deskIconsVisbile === false) {
          return this.$confirm('建议您添加【下载区】，无下载区会导致顾客无法在桌面创建或保存文件，影响顾客上网体验', '提示', {
            type: 'error',
            confirmButtonText: '仍然保存',
            cancelButtonText: '立即添加',
            cancelButtonClass: 'btn-save-cancel',
            confirmButtonClass: 'btn-save-confirm'
          }).catch((res) => {
            this.$store.commit('showBubbleTip', {
              type: 'downloadArea',
              visible: true
            })
            return Promise.reject(new Error())
          })
        } else {
          return Promise.resolve()
        }
      } else {
        return Promise.resolve()
      }
    },
    checkOrigin () {
      if (this.isModify()) {
        let storeKeys = Object.keys(this.storeState)
        if (storeKeys.length && storeKeys.indexOf('module-origin') >= 0 && this.storeState.deskIconsVisbile === true) {
          return this.$confirm('建议您将【客户机桌面图标隐藏】，因您添加了【原图标】，桌面会出现两套原桌面图标，可能影响顾客上网体验', '提示', {
            type: 'error',
            confirmButtonText: '仍然保存',
            cancelButtonText: '立即隐藏',
            cancelButtonClass: 'btn-save-cancel',
            confirmButtonClass: 'btn-save-confirm'
          }).catch((res) => {
            this.$store.commit('showBubbleTip', {
              type: 'origin',
              visible: true
            })
            return Promise.reject(new Error())
          })
        } else {
          return Promise.resolve()
        }
      } else {
        return Promise.resolve()
      }
    },
    addModuleName () {
      if (!this.$globalData.editId) {
        return this.$prompt('请输入模板名称', '提示', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
          inputValidator: (val) => {
            if (!val || val.length > 20) {
              return false
            }
            return true
          },
          inputErrorMessage: '请输入不超过20个字符长度名称'
        })
      } else {
        return Promise.resolve()
      }
    },
    continueEdit () {
      this.$confirm('保存成功', '提示', {
        type: 'success',
        confirmButtonText: '继续编辑',
        cancelButtonText: '退出编辑'
      }).catch(action => { // 退出编辑
        this.$editor.listenser.fire('exit')
      })
    },
    previewImg (name) {
      loading = this.$loading({
        lock: true,
        text: '正在保存自定义桌面...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, .9)'
      })

      let main = document.getElementById('main')
      let mainBackground = ''
      try {
        const done = () => {
          let elMain = document.querySelector('.el-main')
          elMain.scrollTop = 0 // 设置显示为起始位置
          elMain.scrollLeft = 0

          mainBackground = main.style.backgroundImage
          main.style.position = 'absolute'
          main.style.top = 0
          main.style.left = 0
          main.style.backgroundImage = 'none'

          html2canvas(main, {
            useCORS: false,
            logging: false,
            imageTimeout: 0,
            backgroundColor: null,
            ignoreElements: (element) => {
              if (element.class === 'task-area') { // 忽略底部任务栏
                return true
              }
              return false
            }
          }).then(canvas => {
            let img = canvas2image.convertToPNG(canvas, 390, 220)
            this.save(name, img.src)
            // 还原原始尺寸
            main.style.position = ''
            main.style.backgroundImage = mainBackground
          })
        }
        done()
      } catch (e) {
        this.save(name)
        // 还原原始尺寸
        main.style.position = ''
        main.style.backgroundImage = mainBackground
      }
    },
    formatLayout (dataState) {
      // 过滤保存数据，多余的保存数据在页面编辑状态回填时可能造成页面状态错误
      // 例如：在有弹框情况下保存会存储store上的弹框状态，造成bug
      let data = this.deepClone(dataState)
      delete data.coustomIconsEdit // 删除图标编辑弹框状态机
      delete data.editData // 删除图标编辑弹框状态机
      delete data.originForbidVisible // 删除屏蔽广告图标弹框状态机
      delete data.skinVisible // 删除皮肤弹框状态机
      delete data.dialogWallVisible // 删除壁纸设置状态机
      return data
    },
    save (name, preview) {
      let moduleArr = []
      // console.log(this.storeState)
      this.iteratorModule((item, key) => {
        moduleArr.push({...item, name: key})
      })

      let wallpapers = ''
      // console.log(this.storeState)
      if (this.storeState.wall && this.storeState.openWall) {
        if (Array.isArray(this.storeState.wall)) {
          wallpapers = this.storeState.wall.map((item) => {
            return {_id: item._id}
          })
        } else if (typeof this.storeState.wall === 'object') {
          this.storeState.wall = [this.storeState.wall]
        }
      }
      let formatLayout = this.formatLayout(this.storeState)

      let params = {
        resolution: this.storeState.resolution,
        name: name || '',
        preview: preview,
        layout: formatLayout,
        html: '',
        wallpaper: wallpapers,
        desktop_mask_visible: !formatLayout.deskIconsVisbile,
        random_wallpaper: this.storeState.randomWall
      }

      if (this.$globalData.editId) { // 编辑
        params._id = this.$globalData.editId
        delete params.name
      }

      this.$http.post('/dpp/api/v1/custom-desktop/template/save', params).then((res) => {
        // 更新最新保存数据
        storage.save('lastModify', JSON.stringify(this.$store.history.getCurdo()))
        this.$globalData.editId = res.data._id
        this.continueEdit()
      })
      loading.close()
    },
    async handleSave () {
      if (this.saveLcok()) {
        return
      }
      try {
        await this.checkDownload()
        await this.checkOrigin()
        const nameConfirm = await this.addModuleName()
        if (nameConfirm) {
          this.previewImg(nameConfirm.value)
        } else {
          this.previewImg()
        }
      } catch (e) {
      }
    }
  }
}
</script>
<style lang="scss">
body button.btn-save-cancel {
  float: right;
  margin: 0 43px 10px 10px;
  color: #fff;
  background-color: #0076ff;
  border-color: #0076ff;
  &:focus,
  &:hover {
    background: #3391ff !important;
    border-color: #3391ff !important;
    color: #fff !important;
  }
}
body button.btn-save-confirm {
  float: right;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  &:focus,
  &:hover {
    color: #0076ff !important;
    border-color: #b3d6ff !important;
    background-color: #e6f1ff !important;
  }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tb-item {
  float: right;
  margin: 0 5px;
  @include item-topbar();
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
}
.icon-save {
  display: inline-block;
  margin: 2px 5px;
  width: 18px;
  height: 18px;
  vertical-align: -6px;
  background: url(#{$imgPathTopbar}icons/topbar/icon-save.png) center center no-repeat;
}
</style>
