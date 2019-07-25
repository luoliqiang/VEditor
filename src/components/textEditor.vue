<template>
    <!-- 富文本编辑器 -->
    <div @mousedown.stop>
      <el-dialog
        class="wall"
        title="编辑标题"
        :visible.sync="visible"
        :close-on-click-modal="false"
        width="600px">
        <quill-editor
          class="editor"
          v-model="content"
          ref="myQuillEditor"
          @change="limitLength"
          :options="editorOption">
        </quill-editor>

        <div slot="footer" class="dialog-footer" style="text-align: center;">
          <el-button type="primary" @click="saveText" style="width: 240px;">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
// 工具栏配置
import { quillEditor } from 'vue-quill-editor'
import { mutationModule } from '@/store/dealModule.js'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  // [{ header: 1 }, { header: 2 }], // 1、2 级标题
  // [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  // [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  // [{ indent: '-1' }, { indent: '+1' }], // 缩进                  // 文本方向
  // [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
  // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }] // 字体颜色、字体背景颜色
  // [{ font: [] }], // 字体种类
  // [{ align: [] }], // 对齐方式
  // ['clean'] // 清除文本格式
]

export default {
  name: 'textEditor',
  components: {
    quillEditor
  },
  data () {
    return {
      content: this.value,
      editorOption: {
        theme: 'snow', // or 'bubble'
        placeholder: '请输入文字',
        modules: {
          toolbar: {
            container: toolbarOptions
          }
        }
      }
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.content = this.getSingleActiveModule('textEditorContent')
      }
    }
  },
  computed: {
    visible: {
      get () {
        return this.storeState.textEditorVisible
      },
      set (val) {
        this.$store.commit('toggleEditorVisible', val)
      }
    }
  },
  methods: {
    limitLength (e) {
      if (e.text) {
        this.text = e.text.trim() // trim
      }
    },
    saveText () {
      if (!this.text) {
        this.$message.error('请输入标题！')
        return
      }
      if (this.text.length > 10) {
        this.$message.error('标题字数不得超过10个！')
        return
      }
      this.visible = false
      let moduleName = this.activeModuleName
      mutationModule(moduleName, 'saveTextEditor', this.content)
    }
  }
}
</script>
<style>
.editor {
  line-height: normal !important;
}
.ql-container {
  height: 150px !important;
}
.ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
  content: '等宽字体';
}
</style>
