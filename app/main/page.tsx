'use client'
import { ChangeEventHandler, useEffect, useState } from "react";
import TimeDisplay from "@/components/Time-display/TimeDisplay";
import SimpleTimer from "@/model/Simple-timer/SimpleTimer";

const simpleTimer = new SimpleTimer()

export default function Main() {

  const [time, setTime] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [timerStarted, setTimerStarted] = useState(false)
  const isTimeLeft = time - timeElapsed > 0

  const changeTime: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value
    setTime(parseInt(value))
    simpleTimer.setTime(parseInt(value))
  }

  const startClick = () => {
    if (!timerStarted) {
      simpleTimer.startTimer(() => setTimeElapsed(t => t + 1))
    } else {
      simpleTimer.stopTimer()
    }
    setTimerStarted(!timerStarted)
  }

  const stopClick = () => {
    setTimeElapsed(0)
    simpleTimer.stopTimer()
    setTimerStarted(false)
  }

  useEffect(() => {
    !isTimeLeft && simpleTimer.stopTimer()
  }, [isTimeLeft])

  return (<section>
    <div className="w-full bg-red-700 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col items-center">
      <TimeDisplay timeSet={time} timeElapsed={timeElapsed} />
      <input className="p-1 text-xl" type="number" onChange={changeTime} value={time} />
      <button className="p-2 bg-lime-700 w-6/12 rounded-lg border-2 border-slate-200 shadow-lg border-double my-1"
        disabled={!time} onClick={startClick}>{timerStarted ? 'Pause' : 'Start'}</button>
      <button className="p-2 bg-slate-500 w-6/12 rounded-lg border-2 border-slate-200 shadow-lg border-double my-1"
        disabled={!timeElapsed} onClick={stopClick}>Stop</button>
      <div className="text-2xl">{isTimeLeft ? 'Counting' : 'Stopped'}</div>
      <div className="text-2xl">{isTimeLeft ? 'Ready' : 'Alarm'}</div>
    </div>
  </section>)
}