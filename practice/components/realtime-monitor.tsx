import React, { FC, FunctionComponent, useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components";
import CountDownTimer from "./countdown-timer";

type RealtimeMonitorProps = {
  className?: string
}

const RealtimeMonitor: FC<RealtimeMonitorProps> = function ({className}) {
  return (<div className={className}>
    <div className="points_label">Points:</div>
    <div className="points">0</div>
    <div className="time_remaining_label">Time remaining:</div>
    <div className="time_remaining">
      <CountDownTimer initialMinute={5} initialSeconds={0} />
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