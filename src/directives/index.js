import pick from './pick.js'
import drag from './drag.js'

const dirts = [pick, drag]

const install = function (Vue, opts = {}) {
  dirts.forEach(dirt => {
    Vue.directive(dirt.name, dirt)
  })
}

export default install
