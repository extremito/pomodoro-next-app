import { IData } from "@/app/main/types"
import { SECOND_PASSED, SET_TIME, START_SECONDS, START_TIMER, START_TIMER_AND_SUBSCRIBE, STOP_TIMER } from "@/app/content/constants"

addEventListener('message', ({ data }: MessageEvent<Partial<IData>>) => {
  console.log('worker message event in main', data)
  // const timer = new SimpleTimer()
  // const { type, payload } = data
  // const selfPostMessage = postMessage.bind(this)
  // console.log(type)
  // switch (type) {
  //   case SET_TIME: {
  //     timer.setTime(typeof payload === 'number' ? payload : 0)
  //     break
  //   }
  //   case START_TIMER: {
  //     timer.startTime()
  //     break
  //   }
  //   case START_TIMER_AND_SUBSCRIBE: {
  //     timer.startTimerAndSubscribe(() => { postMessage({ type: 'TIME_ELAPSED', payload: timer.timeElapsed }) })
  //     break
  //   }
  //   case START_SECONDS: {
  //     timer.startTimerAndSubscribe(() => { selfPostMessage({ type: SECOND_PASSED }) })
  //   }
  //   case STOP_TIMER: {
  //     timer.stopTimer()
  //     break
  //   }
  // }
})