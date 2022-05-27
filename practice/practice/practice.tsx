import React, { FC } from "react";
import StickyHeaderFor from "../components/StickyHeaderFor";
import TaskLoop from "./taskLoop";
import RealTimeMonitor from '../components/realtime-monitor'
import { selectWholePracticeState, start } from "./practiceSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

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
      <TaskLoop />
    </StickyHeaderFor>
  )
}

const FinishedPractice: FC = () => {
  return (
    <StickyHeaderFor header={<RealTimeMonitor />}> 
      <TaskLoop />
      this is finished
    </StickyHeaderFor>
  )
}

const Practice: FC<Props> = function ({className}) {
  const practice = useAppSelector(selectWholePracticeState);
  const status = practice.status
  return (<div className={className}>
    {status === 'not-started' && <NotStartedPractice />}
    {status === 'started' && <StartedPractice />}
    {status === 'finished' && <FinishedPractice />}
  </div>)
}

interface Props {
  className?: string
}

export default Practice
