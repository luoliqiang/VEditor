import keymap from '@/assets/js/editor/tool/keymap.js'
export const shortCut = {
  mounted () {
    this.$nextTick(() => {
      this.$editor.listenser.on({
        name: 'keydown',
        callback: (keyCode, e) => {
          this.keyCallback && this.keyCallback(keyCode, e)
        }
      })
    })
  },
  methods: {
    keymap: keymap
  }
}
