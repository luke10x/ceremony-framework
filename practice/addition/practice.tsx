import React, { FC } from "react";
import StickyHeaderFor from "../components/StickyHeaderFor";
import Runway from "./Runway";
import RealTimeMonitor from '../components/realtime-monitor'
import { PracticeState, PracticeStatus, selectWholePracticeState, start } from "./practiceSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

interface PracticeProps {
  className?: string
}

const Practice: FC<PracticeProps> = function ({className}) {
  const dispatch = useAppDispatch();
  const practice = useAppSelector(selectWholePracticeState);

  const status = practice.status
  return (<div className={className}>
    {status === 'not-started' && <div>Practice is about to start...
      <button onClick={() => dispatch(start())}>Start</button>
      </div>}
    {status === 'started' && <div>
        <StickyHeaderFor header={<RealTimeMonitor />}> 
          <Runway max={10} />
        </StickyHeaderFor>
      </div>}
  </div>)
}

export default Practice