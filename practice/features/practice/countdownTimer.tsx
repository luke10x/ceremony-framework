
import React, { FC } from 'react'
import { useState, useEffect } from 'react';

type CountDownTimerProps = {
  startedAt?: number
  durationInMs: number
  onFinish: () => void
}

const CountDownTimer: FC<CountDownTimerProps> = ({ startedAt, durationInMs, onFinish }) => {
  const [ endTime, setEndTime] = useState(0);
  const [ currentTime, setCurrentTime] = useState(0);

  useEffect(() => {

    if (startedAt === undefined) {
      return () => {}
    }
    
    setCurrentTime((new Date()).getTime())    
    setEndTime(startedAt + durationInMs)

    const timeout = setTimeout(
      () => {
        clearInterval(tick)
        onFinish()
      },
      durationInMs
    )

    let tick = setInterval(
      () => {
        const now = (new Date()).getTime()
        setCurrentTime(now)
        if (endTime !== 0 && now > endTime) {
          clearTimeout(timeout);
          clearInterval(tick);
          onFinish()
        }
      },
      1000
    )

    return () => {
      clearTimeout(timeout);
      clearInterval(tick);
    };
  }, [startedAt]);

  let remainingSeconds = Math.floor((endTime - currentTime) / 1000);
  if (remainingSeconds < 0) {
    remainingSeconds = 0
  }
  if (startedAt === undefined) {
    remainingSeconds = durationInMs / 1000
  }

  let hours   = Math.floor(remainingSeconds / 3600); // get hours
  let minutes = Math.floor((remainingSeconds - (hours * 3600)) / 60); // get minutes
  let seconds = remainingSeconds - (hours * 3600) - (minutes * 60); //  get seconds

  return (<>
    <span>
      {hours < 10 ?  `0${hours}` : hours}
      :
      {minutes < 10 ?  `0${minutes}` : minutes}
      :
      {seconds < 10 ?  `0${seconds}` : seconds}
    </span> 
  </>)
}

export default CountDownTimer;