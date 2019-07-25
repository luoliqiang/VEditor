/**
 *
 * 订阅发布器
 * @author: luoliqiang
 */

const listenser = function () {
  const context = this
  let idx = 0

  const ownEqual = function (originalKey, key, originalObj) {
    return originalObj.hasOwnProperty(originalKey) && originalKey === key
  }

  const findEvent = function (eventName, events, callback) {
    const name = eventName.split('.')[0]
    const namespace = eventName.split('.')[1]
    idx = 0
    for (let key in events) {
      if (ownEqual(key, name, events)) {
        let eventArr = events[key]
        for (idx = 0; idx < eventArr.length; idx++) {
          let event = eventArr[idx]
          if (!namespace || namespace === event.namespace) {
            callback(event, idx, eventArr)
          }
        }
      }
    }
  }

  const listenser = {
    events: {},
    on (opt) {
      const name = opt.name.split('.')[0]
      const namespace = opt.name.split('.')[1]

      if (namespace) {
        opt.namespace = namespace
      }
      if (this.events[name]) {
        this.events[name].push(opt)
      } else {
        this.events[name] = [opt]
      }
    },
    once (opt) {
      opt.once = true
      this.on(opt)
    },
    fire (name, ...fireOpt) {
      findEvent(name, this.events, (event, i, eventArr) => {
        event.callback.bind(context)(...fireOpt)
        if (event.once) {
          eventArr.splice(i, 1)
          idx--
        }
      })
    },
    remove (name) {
      findEvent(name, this.events, (event, i, eventArr) => {
        eventArr.splice(i, 1)
        idx--
      })
    }
  }

  this.listenser = listenser
}

export default listenser
