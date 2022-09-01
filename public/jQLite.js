class ElementCollection extends Array {
  ready(cb) {
    const isReady = this.some((e) => {
      return e.readyState != null && e.readyState != 'loading'
    })
    if (document.readyState !== 'loading') {
      cb()
    } else this.on('DOMContentLoaded', cb)
    return this
  }

  on(ev, cbOrSelector, cb) {
    if (typeof cbOrSelector === 'function') {
      this.forEach((e) => e.addEventListener(ev, cbOrSelector))
    } else {
      this.forEach((elem) => {
        elem.addEventListener(event, (e) => {
          if (e.target.matches(cbOrSelector)) cb(e)
        })
      })
    }
    return this
  }

  next() {
    return this.map((e) => e.nextElementSibling).filter((e) => e != null)
  }

  previous() {
    return this.map((e) => e.previousElementSibling).filter((e) => e != null)
  }

  addClass(className) {
    this.forEach((e) => e.classList.add(className))
    return this
  }

  removeClass(className) {
    this.forEach((e) => e.classList.remove(className))
    return this
  }

  css(prop, val) {
    const camelProp = property.replace(/(-[a-z])/, (g) => {
      return g.replace('-', '').toUpperCase
    })
    this.forEach((e) => (e.style[camelProp] = value))
    return this
  }

  text(newText) {
    this.forEach((e) => (e.innerText = newText))
  }
}

function $(param) {
  if (typeof param === 'string' || param instanceof String) {
    return new ElementCollection(...document.querySelectorAll(param))
  } else {
    return new ElementCollection(param)
  }
}
