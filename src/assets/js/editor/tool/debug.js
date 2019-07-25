/* global console */

export let warn = function () {}
export let tip = function () {}

const href = window.location.href
const debugMode = href.indexOf('localhost') !== -1 || href.indexOf('10.') !== -1
const hasConsole = typeof console !== 'undefined'

if (debugMode && hasConsole) {
  warn = function (msg) {
    console.error('[warn]：' + msg)
  }
  tip = function (msg) {
    console.error('[tip]：' + msg)
  }
}
