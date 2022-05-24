import React, { FC } from "react";
import StickyHeaderFor from "../components/StickyHeaderFor";
import Runway from "./Runway";
import RealTimeMonitor from '../components/realtime-monitor'
import { selectWholePracticeState, start } from "./practiceSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

interface PracticeProps {
  className?: string
}

const NotStartedPractice: FC = () => {
  const dispatch = useAppDispatch();
  return (
    <StickyHeaderFor header={<RealTimeMonitor />}> 
      <div>Practice is about to start...</div>
      <button onClick={() => dispatch(start())}>Start</button>
    </StickyHeaderFor>
  )
}

const StartedPractice: FC = () => {
  return (
    <StickyHeaderFor header={<RealTimeMonitor />}> 
      <Runway max={10} />
    </StickyHeaderFor>
  )
}

const FinishedPractice: FC = () => {
  return (
    <StickyHeaderFor header={<RealTimeMonitor />}> 
      <Runway max={10} />
      this is finished
    </StickyHeaderFor>
  )
}

const Practice: FC<PracticeProps> = function ({className}) {
  const practice = useAppSelector(selectWholePracticeState);
  const status = practice.status
  return (<div className={className}>
    {status === 'not-started' && <NotStartedPractice />}
    {status === 'started' && <StartedPractice />}
    {status === 'finished' && <FinishedPractice />}
  </div>)
}

export default Practice
