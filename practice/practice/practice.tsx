import React, { FC } from "react";
import StickyHeaderFor from "../components/StickyHeaderFor";
import TaskLoop from "./taskLoop";
import RealTimeMonitor from '../components/realtime-monitor'
import { selectCurrentPractice, start } from "./practiceSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectSelected } from "../catalog/catalogSlice";

const NotStartedPractice: FC = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectSelected)
  return (
    <StickyHeaderFor header={<RealTimeMonitor />}> 
      <div>Practice "{selected.title}" is about to start...</div>
      <button onClick={() => dispatch(start((new Date()).getTime()))}>Start</button>
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
  const practice = useAppSelector(selectCurrentPractice);
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
