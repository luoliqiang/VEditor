// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import './assets/scss/element-variables.scss'
import store from './store'
import editor from './assets/js/editor/index.js'
import directives from './directives/index.js'
import minxin from './mixins/global.js'
require('es6-promise').polyfill()

/* eslint-disable */

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(directives)
Vue.use(minxin)

new Vue({
  el: '#app',
  store,
  components: { App },
  template: '<App/>',
  mounted () {
    Vue.use(editor, {
      selector: 'main', // 编辑区id
      store: store // 传入store数据对象
    })
  }
})


