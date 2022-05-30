import React, { FC } from "react";
import StickyHeaderFor from "../../components/StickyHeaderFor";
import TaskLoop from "./taskLoop";
import RealTimeMonitor from './realtimeMonitor'
import { selectCurrentPractice, start } from "./practiceSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSelected } from "../catalog/catalogSlice";
import Hints from "./hints";
import styled from "styled-components";

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

const Footer = styled.footer`
  margin: 0; padding: 0;

  border: 0 solid red;
  flex: 0 1;
`

const StartedPractice: FC = () => {
  return (
    <StickyHeaderFor header={<RealTimeMonitor />}> 
      
      <TaskLoop />

      <Footer>
        <Hints />
      </Footer>

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
  return (<>
    {status === 'not-started' && <NotStartedPractice />}
    {status === 'started' && <StartedPractice />}
    {status === 'finished' && <FinishedPractice />}
  </>)
}

interface Props {
  className?: string
}


export default Practice
