import React, { FC, FunctionComponent, useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import { finish, selectCurrentPractice } from "./practiceSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CountDownTimer from "./countdownTimer";
import Link from "next/link";
import Meter from "./meter";

type RealtimeMonitorProps = {
  className?: string
}

const RealtimeMonitor: FC<RealtimeMonitorProps> = function ({className}) {
  const practice = useAppSelector(selectCurrentPractice);
  const dispatch = useAppDispatch();

  return (<div className={className}>
    <div className="section">
      <figure>
        <Link href="/"><a>🔙</a></Link>
     </figure>
      <div className="details">
        <span id="title)-value">Addition</span>
        <label htmlFor="points-value">
          {practice.startedAt && <Meter
            startedAt={practice?.startedAt ?? 0}
            durationInMs={practice.durationInMs} />}
        </label>
      </div>
    </div>

    <div className="section">
      <figure>
        <span>🎯</span>
      </figure>
      <div className="details">
        <span id="points-value">{practice.points}</span>
        <label htmlFor="points-value">points</label>
      </div>
    </div>

    <div className="section">
      <figure>
        <span>⏰</span>
      </figure>
      <div className="details">
        <span id="time-value">
          <CountDownTimer
            startedAt={practice.startedAt}
            durationInMs={practice.durationInMs}
            onFinish={() => dispatch(finish())} />
        </span>
        <label htmlFor="time-value">time remaining</label>
      </div>
    </div>
  </div>)
}

const StyledRealtimeMonitor = styled(RealtimeMonitor)`
  display: flex;
  justify-content: space-between;

  .section {
    display: flex;
  }
  .section figure:first-child {
    margin-inline-start: 10px;
  }
  .section figure{
    margin-inline-end: 10px;
    image-block: 10px;
  }
  .section .details {
    display: flex;
    flex-direction: column;
  }
  .section .details span {
    font-size: 1.6rem;
    text-align: center;
  }
  .section .details label {
   
    text-align: center;
  }
  .section .details span#time-value {
    // width: 4em;
  }

  .section .details label {
    font-size: .9rem;
  }

  a {
    text-decoration: none;
  }

  background-color: #ffffffe9;
  box-shadow: -1px 7px 15px -10px rgba(0,0,0,0.75);
  -webkit-box-shadow: -1px 7px 15px -10px rgba(0,0,0,0.75);
  -moz-box-shadow: -1px 7px 15px -10px rgba(0,0,0,0.75);
`
export default StyledRealtimeMonitor;