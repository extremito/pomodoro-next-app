'use client'
import { ChangeEventHandler, useEffect, useState } from "react";
import TimeDisplay from "@/components/Time-display/TimeDisplay";
import Timer from "@/model/Timer/Timer";

const timer = new Timer()

const cast2Number = (value: unknown) => {
  switch (typeof value) {
    case 'number': {
      return isNaN(value) ? 0 : value
    }
    case 'string': {
      const parsedValue = parseInt(value)
      return isNaN(parsedValue) ? 0 : parsedValue
    }
    default:
      return 0
  }
}

export default function Main() {

  const [timeset, setTimeset] = useState('')
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isCounting, setIsCounting] = useState(timer.isCounting())

  const changeTime: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value
    setTimeset(value)
    timer.timeset = cast2Number(value)
  }

  const handleStartClick = () => {
    if (!timer.isCounting())
      timer.start(setTimeElapsed)
    setIsCounting(timer.isCounting())
  }

  const handleResetClick = () => {
    timer.reset()
    setTimeElapsed(0)
    setIsCounting(timer.isCounting())
  }

  const handlePauseClick = () => {
    if (timer.isCounting()) timer.pause()
    setIsCounting(timer.isCounting())
  }

  // // Audio
  // // Alert
  // // https://cdn.pixabay.com/audio/2023/06/04/audio_3700fd07a3.mp3
  // // Warning
  // // https://cdn.pixabay.com/audio/2023/10/22/audio_107003231b.mp3

  useEffect(() => {
    setTimeElapsed(timer.timeElapsed)
    setIsCounting(timer.isCounting())
  }, [timeElapsed])

  return (<section className="h-full py-4">
    <div className="w-11/12 bg-cyan-600 border border-gray-200 rounded-lg shadow flex flex-col items-center m-auto dark:bg-gray-800 dark:border-gray-700">
      <TimeDisplay timeSet={cast2Number(timeset)} timeElapsed={timeElapsed} />
      <div className="text-2xl">Set working time</div>
      <input className="p-1 text-xl dark:bg-slate-600" type="number" onChange={changeTime} value={timeset} disabled={isCounting} placeholder="0" />
      <button className={`p-2 w-6/12 rounded-lg border-2 bg-lime-700 border-slate-200 shadow-lg border-double my-1 ${!timeset || isCounting || timeElapsed === cast2Number(timeset) ? 'hidden' : ''}`}
        onClick={handleStartClick}>Start</button>
      <button className={`p-2 w-6/12 rounded-lg border-2 bg-lime-700 border-slate-200 shadow-lg border-double my-1 ${isCounting ? '' : 'hidden'}`}
        onClick={handlePauseClick}>Pause</button>
      <button className={`p-2 bg-yellow-600 w-6/12 rounded-lg border-2 border-slate-200 shadow-lg border-double my-1 ${isCounting || timeElapsed ? '' : 'hidden'}`}
        onClick={handleResetClick}>Reset</button>
      {/* <div className="text-2xl">{isTimeLeft ? 'Ready' : 'Alarm'}</div> */}
    </div>
  </section>)
}