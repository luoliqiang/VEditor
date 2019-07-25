const keymap = function (key) {
  const map = {
    'Control': 17,
    'Left': 37,
    'Up': 38,
    'Right': 39,
    'Down': 40,
    'Delete': 46,
    'Enter': 13,
    'A': 65,
    'Z': 90,
    'Y': 89,
    'L': 76,
    'S': 83,
    '[': 219,
    ']': 221
  }

  // 转小写
  for (let name in map) {
    map[name.toLowerCase()] = map[name]
  }

  return map[key]
}

export default keymap
