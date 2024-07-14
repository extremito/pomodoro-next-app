export default class Timer {
  private _timeset: number
  private _timeElapsed: number
  private timerId: NodeJS.Timeout | null
  private _onDoneListener: Function | null

  constructor(time?: number) {
    this._timeset = time || 0
    this._timeElapsed = 0
    this.timerId = null
    this._onDoneListener = null
  }

  public set timeset(time: number) {
    if (!this.timerId) this._timeset = time
  }
  public get timeset(): number {
    return this._timeset
  }
  public get timeElapsed(): number {
    return this._timeElapsed
  }
  public set onDoneListener(listener: Function) {
    this._onDoneListener = typeof listener === 'function' ? listener : null;
  }

  start(listener?: Function) {
    if (!this.timerId) {
      this.timerId = setInterval(() => {
        ++this._timeElapsed
        if (this._timeElapsed === this._timeset) {
          this.pause()
          typeof this._onDoneListener === 'function' && this._onDoneListener()
        }
        listener && listener(this.timeElapsed)
      }, 1000)
    }
  }
  pause() {
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  }
  isCounting() {
    return !!this.timerId
  }
  reset() {
    this.pause()
    this._timeElapsed = 0
  }
}