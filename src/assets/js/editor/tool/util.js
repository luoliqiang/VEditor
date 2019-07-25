/**
 *
 * @param {name} 数组对象中的键名
 * @param {obj} 数组对象
 * eg. obj = [{age: 1},{age: 2}] => minimum(age, obj)
 */
const minimum = function (name, obj) {
  let min
  if (!obj) {
    return null
  }
  for (let val of obj) {
    if (typeof min === 'undefined' || val[name] < min) {
      min = val[name]
    }
  }
  return min
}
// 最大值
const maximum = function (name, obj) {
  let max
  if (!obj) {
    return null
  }
  for (let val of obj) {
    if (typeof max === 'undefined' || val[name] > max) {
      max = val[name]
    }
  }
  return max
}
/**
 *
 * @param {key} 键名
 * @param {obj} 对象数组[{},{}]
 * @param {value} 键值(可选)
 * 获取数组每个对象中的同一键名的值组成的数组，或者数组每个对象中的键值相等的对象组成的数组
 */
const keyValues = function (key, obj, value) {
  if (!obj) {
    return null
  }
  let result = []
  for (let item of obj) {
    if (value) {
      if (item[key] === value) {
        result.push(item)
      }
    } else if (item[key]) {
      result.push(item[key])
    }
  }
  if (result.length > 1) {
    return result
  } else if (result.length === 1) {
    return result[0]
  } else {
    return null
  }
}
/**
 *
 * @param {fun} 函数
 * @param {obj} 延迟时间
 * 消抖函数 eg.
 * window.addEventListener('resize', () => {
 *     debounce.bind(this)(resize)
 *   })
 */
let debounceTimer = null
const debounce = function (fun, timeout) {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = setTimeout(() => {
    fun.bind(this)()
  }, timeout || 300)
}

const getUrlParams = function (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r !== null) {
    return r[2]
  }
  return null
}

// 优先请求先跨域的图片资源
const CORSImages = function (imgs) {
  if (!imgs) {
    return
  }

  let list = typeof imgs === 'string' ? [imgs] : imgs

  list.forEach(function (src) {
    let img = new Image()
    img.onload = function () {
      // console.log('onload', img)
    }
    img.crossOrigin = 'anonymous'
    img.src = src
  })
}

// localstorage
const storage = {
  save (name, data) {
    localStorage.setItem('customDesk-' + name, data)
  },
  get (name) {
    return localStorage.getItem('customDesk-' + name)
  },
  remove (name) {
    localStorage.removeItem('customDesk-' + name)
  }
}
// cookie
function getCookie (name) {
  let tmp
  let reg = new RegExp('(?:^| )' + name + '=([^;]*)(?:;|$)', 'gi')

  tmp = reg.exec(document.cookie)

  if (name === 'snbid') { // 中文snbid需要转码
    return decodeURIComponent(tmp[1])
  } else {
    return tmp[1]
  }
}

export {
  minimum,
  maximum,
  debounce,
  keyValues,
  getUrlParams,
  CORSImages,
  storage,
  getCookie
}
