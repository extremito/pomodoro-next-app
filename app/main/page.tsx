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

  const timerButtonClick = () => {
    if (!timerStarted) {
      simpleTimer.startTimer(() => setTimeElapsed(t => t + 1))
    } else {
      simpleTimer.stopTimer()
      // setTimeElapsed(0)
    }
    setTimerStarted(!timerStarted)
  }

  useEffect(() => {
    !isTimeLeft && simpleTimer.stopTimer()
  }, [isTimeLeft])

  return (<section>
    <TimeDisplay timeSet={time} timeElapsed={timeElapsed} />
    <input type="number" onChange={changeTime} value={time} />
    <button onClick={timerButtonClick}>{timerStarted ? 'Stop' : 'Start'}</button>
    <div>{isTimeLeft ? 'Counting' : 'Stopped'}</div>
    <div>{isTimeLeft ? 'Ready' : 'Alarm'}</div>
  </section>)
}