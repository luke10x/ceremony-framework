
import React, { FC } from 'react'
import { useState, useEffect } from 'react';

type CountDownTimerProps = {
  totalSeconds: number
  onFinish: () => void
  started: boolean
}

const CountDownTimer: FC<CountDownTimerProps> = ({totalSeconds = 120, onFinish, started}) => {

  const [ elapsedSeconds, setElapsedSeconds ] = useState(0);

  useEffect(() => {

    if (!started) {
      return () => {}
    }

    const timeout = setTimeout(
      () => {
        clearInterval(tick)
        setElapsedSeconds(totalSeconds)
        onFinish()
      },
      totalSeconds * 1000
    )

    const startSeconds = Math.floor(Number(new Date()) / 1000)
    let tick = setInterval(
      () => {
        const nowSeconds = Math.floor(Number(new Date()) / 1000);
        setElapsedSeconds(nowSeconds - startSeconds)
      },
      1000
    )

    return ()=> {
      clearTimeout(timeout);
      clearInterval(tick);
    };
  }, [started]);

  const remainingSeconds = totalSeconds - elapsedSeconds;

  let hours   = Math.floor(remainingSeconds / 3600); // get hours
  let minutes = Math.floor((remainingSeconds - (hours * 3600)) / 60); // get minutes
  let seconds = remainingSeconds - (hours * 3600) - (minutes * 60); //  get seconds
  if (seconds < 0) seconds = 0

  return (<>
    <span>
      {/* {hours < 10 ?  `0${hours}` : hours}
      : */}
      {minutes < 10 ?  `0${minutes}` : minutes}
      :
      {seconds < 10 ?  `0${seconds}` : seconds}
    </span> 
  </>)
}

export default CountDownTimer;