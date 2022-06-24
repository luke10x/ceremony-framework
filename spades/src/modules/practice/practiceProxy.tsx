import React, { FC } from "react";
import StickyHeaderFor from "../../components/StickyHeaderFor";
import TaskLoop from "./taskLoop";
import RealTimeMonitor from './realtimeMonitor'
import { selectCurrentPractice, start } from "./practiceSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSelected } from "../catalog/catalogSlice";
import Hints from "./hints";
import styled from "styled-components";
import FinishedPracticeDetails from "./finishedPracticeDetails";

const NotStartedContent = styled.div`
  margin: 10px;
  text-align: center;

  p {
    text-align: center;
  }
  button {
    padding: 20px;
    font-family: 'Dekko';
    font-size: 1.2em;
  }
`

const NotStartedPractice: FC<Props> = ({className}) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectSelected)
  return (
    <StickyHeaderFor header={<RealTimeMonitor />} className={className}> 
      <NotStartedContent>
        <p>
          Are you ready to start with
        </p>
        <p>"{selected.title}"</p>
        <p>?</p>
        <button
          onClick={() => dispatch(start((new Date()).getTime()))}
        >Start now!</button>      
      </NotStartedContent>
    </StickyHeaderFor>
  )
}

const Footer = styled.footer`
  margin: 0; padding: 0;
  flex: 0 1;
`

const StartedPractice: FC<Props> = ({className}) => {
  return (<>
    <StickyHeaderFor header={<RealTimeMonitor />} className={className}> 
      <TaskLoop />
    </StickyHeaderFor>

    {/* Sticky header is not for this Footer */}
    <Footer>
      <Hints />
    </Footer>
  </>)
}

const FinishedPractice: FC<Props> = ({className}) => {
  const practice = useAppSelector(selectCurrentPractice);

  return (
    <StickyHeaderFor header={<RealTimeMonitor />} className={className}> 
      <TaskLoop />
      <FinishedPracticeDetails />
    </StickyHeaderFor>
  )
}

const Practice: FC<Props> = function ({className}) {
  const practice = useAppSelector(selectCurrentPractice);
  const status = practice.status
  return (<>
    {status === 'not-started' && <NotStartedPractice className={className} />}
    {status === 'started' && <StartedPractice className={className} />}
    {status === 'finished' && <FinishedPractice className={className} />}
  </>)
}

interface Props {
  className?: string
}


export default Practice
