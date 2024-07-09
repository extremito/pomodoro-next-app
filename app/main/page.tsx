'use client'
import { ChangeEventHandler, useEffect, useState, useRef } from "react";
import TimeDisplay from "@/components/Time-display/TimeDisplay";
import SimpleTimer from "@/model/Simple-timer/SimpleTimer";

const simpleTimer = new SimpleTimer()

export default function Main() {

  const [time, setTime] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [timerStarted, setTimerStarted] = useState(false)
  const swRef = useRef<Worker>()
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
    swRef.current?.postMessage('within start button')
  }

  const resetClick = () => {
    setTimeElapsed(0)
    simpleTimer.stopTimer()
    setTimerStarted(false)
  }

  useEffect(() => {
    !isTimeLeft && simpleTimer.stopTimer()
  }, [isTimeLeft])
  // Audio
  // Alert
  // https://cdn.pixabay.com/audio/2023/06/04/audio_3700fd07a3.mp3
  // Warning
  // https://cdn.pixabay.com/audio/2023/10/22/audio_107003231b.mp3
  useEffect(() => {
    if(window.Worker) {
      swRef.current = new Worker(new URL('../../model/Worker-simple-timer/workerSimpleTimer.ts', import.meta.url))
    }
    return () => swRef.current?.terminate()
  }, [])


  return (<section className="h-full py-4">
    <div className="w-11/12 bg-red-700 border border-gray-200 rounded-lg shadow flex flex-col items-center m-auto dark:bg-gray-800 dark:border-gray-700">
      <TimeDisplay timeSet={time} timeElapsed={timeElapsed} />
      <div className="text-2xl">Set working time</div>
      <input className="p-1 text-xl dark:bg-slate-600" type="number" onChange={changeTime} value={time} disabled={timerStarted} />
      <button className={`p-2 bg-lime-700 w-6/12 rounded-lg border-2 border-slate-200 shadow-lg border-double my-1 ${!time ? 'hidden' : ''}`}
        disabled={!time} onClick={startClick}>{timerStarted ? 'Pause' : 'Start'}</button>
      <button className={`p-2 bg-slate-500 w-6/12 rounded-lg border-2 border-slate-200 shadow-lg border-double my-1 ${!timeElapsed ? 'hidden' : ''}`}
        disabled={!timeElapsed} onClick={resetClick}>Reset</button>
      <div className="text-2xl">{isTimeLeft ? 'Counting' : 'Stopped'}</div>
      <div className="text-2xl">{isTimeLeft ? 'Ready' : 'Alarm'}</div>
    </div>
  </section>)
}