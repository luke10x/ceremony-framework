
import React, { FC } from 'react'
import { useState, useEffect } from 'react';

type MeterProps = {
  startedAt: number
  durationInMs: number
}

const Meter: FC<MeterProps> = ({ startedAt, durationInMs }) => {
  const [ endTime, setEndTime] = useState(0);
  const [ currentTime, setCurrentTime] = useState(0);

  useEffect(() => {    
    setCurrentTime((new Date()).getTime())    
    setEndTime(startedAt + durationInMs)


    let tick = setInterval(
      () => {
        const now = (new Date()).getTime()
        setCurrentTime(now)
        if (endTime !== 0 && now > endTime) {
          clearInterval(tick);
        }
      },
      300
    )

    return () => {
      clearInterval(tick);
    };
  }, [startedAt]);

  const min = startedAt;
  const max = startedAt + durationInMs;
  // const currentTime = (new Date()).getTime()
  const left = max - currentTime
  const value = min + left

  return (<meter 
    min={min} max={max}
    low={min + 5 * 1000 + 999} high={min + 10 * 1000 + 999}  optimum={min + 10 * 1000 + 1000} 
    value={value} />)
}

export default Meter;