import React, { FC, FunctionComponent, useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import { finish, selectCurrentPractice } from "../practice/practiceSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CountDownTimer from "./countdown-timer";
import Link from "next/link";

type RealtimeMonitorProps = {
  className?: string
}

const RealtimeMonitor: FC<RealtimeMonitorProps> = function ({className}) {
  const practice = useAppSelector(selectCurrentPractice);
  const dispatch = useAppDispatch();

  return (<div className={className}>
    <div>

      <Link href="/"><a>BACK</a></Link>
    </div>
    <div className="points_label">Points:</div>
    <div className="points">0</div>
    <div className="time_remaining_label">Time remaining:</div>
    <div className="time_remaining">
      <CountDownTimer
          startedAt={practice.startedAt}
          durationInMs={120 * 1000}
          onFinish={() => dispatch(finish())}
         />
    </div>
  </div>)
}

const StyledRealtimeMonitor = styled(RealtimeMonitor)`
  display: flex;
  justify-content: space-between;

  font-size: 2rem;
  background-color: #ffffffe9;
  box-shadow: -1px 7px 15px -10px rgba(0,0,0,0.75);
  -webkit-box-shadow: -1px 7px 15px -10px rgba(0,0,0,0.75);
  -moz-box-shadow: -1px 7px 15px -10px rgba(0,0,0,0.75);
`
export default StyledRealtimeMonitor;