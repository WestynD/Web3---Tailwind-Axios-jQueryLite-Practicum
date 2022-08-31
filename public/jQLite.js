class elementCollection extends array {
  ready(cb) {
    const isReady = this.some((e) => {
      return e.readyState != null && e.readyState != 'loading'
    })
    if (document.readyState !== 'loading') {
      cb()
    } else this.on('DOMContentLoaded', cb())
  }

  on(ev, cb) {
    this.forEach((e) => e.addEventListener(ev, cb))
  }
}

function $(param) {
  if (typeof para === 'string') {
    return new elementCollection(...document.querySelectorAll(param))
  } else {
    return new elementCollection(param)
  }
}
