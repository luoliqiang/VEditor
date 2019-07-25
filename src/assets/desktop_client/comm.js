const webandler = window.web_handler
export default {
  log: function (content, type) {
    type = type || 'info'
    content = '[桌面FontEnd日志]' + content

    var log_types = { info: 0, warning: 1, error: 2 }

    if (web_handler && typeof web_handler.printLog !== 'undefined') {
      web_handler.printLog(log_types[type] || 0, content)
    } else if (window.console) {
      if (type === 'error' && console.error) {
        console.error(content)
      } else if (console.log) {
        console.log(content)
      }
    }
  },

  openUrl: function (url) {
    this.log('[openUrl]：' + url)
    if (web_handler && web_handler.openUrl) {
      web_handler.openUrl(url)
    }
  },
  openAppBox: function (key, url) {
    if (web_handler && typeof web_handler.openAppBox !== 'undefined') {
      var host_url = 'https://plaza.wxdesk.com' + url
      this.log('[跳转]：' + host_url)

      web_handler.openAppBox(key, host_url)
    } else {
      this.startApp(key)
    }
  },
  startApp: function (id) {
    this.log('Start App ID：' + id)

    if (web_handler && typeof web_handler.on_click !== 'undefined') {
      web_handler.on_click(String(id))
    }
  },
  menuApp: function (item_id, menu_item_id, text) {
    var str = {
      item_id: item_id,
      menu_item_id: menu_item_id,
      text: text || ''
    }

    str = JSON.stringify(str)
    this.log('Menu：' + str)

    if (web_handler && typeof web_handler.on_menu_click !== 'undefined') {
      try {
        web_handler.on_menu_click(str)
      } catch (e) { alert(e.message) }
    }
  },
  isFeeMgr: function () { // 一体化 + 计费环境
    var desktop_feemgr = window.desktop_feemgr,
      is_feemgr = desktop_feemgr && desktop_feemgr.getEnv

    if (is_feemgr) {
      var desktop_feemgr_env = desktop_feemgr.getEnv()
      is_feemgr = desktop_feemgr_env.fee_itg === 1 && '1,2'.indexOf(desktop_feemgr_env.fee_type) >= 0
    }

    return is_feemgr
  },
  mergeArr: function () {
    return Array.prototype.concat.apply([], arguments)
  }

}
