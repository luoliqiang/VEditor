/* eslint-disable */
const container = function() {
  let container
  
  if(typeof this.selector === 'string') {
    container = document.getElementById(this.selector)
  } else {
    container = this.selector
  }

  if (!container) {
    throw new Error('Invalid selector: ' + this.selector)
  }

  container.className = container.className + ' desk-editor'
  this.container = container
  this.containerWraper = container.parentNode
  // 编辑区边距margin
  this.containerOffset = {
    x: this.container.getBoundingClientRect().left,
    y: this.container.getBoundingClientRect().top
  }
}

export default container


