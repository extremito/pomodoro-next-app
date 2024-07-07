export default class SimpleTimer {
  private time: number
  private timerId: NodeJS.Timeout | null

  constructor() {
    this.time = 0
    this.timerId = null
    this.add1Second = this.add1Second.bind(this)
  }
  setTime(time: number) {
    this.time = time
  }
  startTimer(listener: Function) {
    this.timerId = setInterval(() => {
      this.add1Second()
      listener()
    }, 1000)
  }
  stopTimer() {
    this.timerId && clearInterval(this.timerId)
    this.timerId = null
  }
  add1Second() {
    ++this.time
  }
}