import React, { FC, useEffect, useRef } from "react";
import styled from 'styled-components';
import { keyframes } from 'styled-components'
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addTask, selectWholePracticeState, applySolution, createApplySolutionAction } from "./practiceSlice";
import Addition, { AdditionSolution, AdditionTask, additionTaskToProps, createAddTaskAction } from "./addition/addition";
import { Solution, TaskType } from "./types";

const Runway: FC<Props> = function ({ className }) {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectWholePracticeState);

  const isInitialRender = useRef(true);// in react, when refs are changed component dont re-render 

  const addOneMore = (solution: Solution, taskId: string) => {
    dispatch(applySolution(createApplySolutionAction(solution, taskId)))
    dispatch(addTask(createAddTaskAction()))
  }

  useEffect(() => {
    if(isInitialRender.current){// skip initial execution of useEffect
      isInitialRender.current = false;// set it to false so subsequent changes of dependency arr will make useEffect to execute
      return;
    }

    dispatch(addTask(createAddTaskAction()))
  }, []);

  return (
    <div className={`${className} status-${state.status}`}>
      {state.practiceTasks
        .filter(t => state.status === 'started' || t.solution !== undefined)
        .map((task) => {

          switch (task.type) {
            case TaskType.Addition:
              const onSolve = (solution: AdditionSolution) => addOneMore(solution, task.taskId)
              return (<div className="each" key={task.taskId}>
                <Addition {...additionTaskToProps(task as AdditionTask, onSolve)}/>
              </div>)
            default:
              return (<div className="each" key={task.taskId}>
                what is the task type?
              </div>)
          }
        })
      }
    </div>
  )
} 

const smallDown = keyframes`
  0% { font-size: 1.6rem; }
  100% { font-size: 1rem; }
`

const appear = keyframes`
  0% {   opacity: 0.3; }
  100% { opacity: 1; }
`

const StyledRunway = styled(Runway)`
  display: flex;
  flex-direction: column;

  &.status-started .each:last-child {
    border: 1px solid #ccc;
  
    padding: 20px;
    margin: 20px;
    font-size: 1.6rem;

    background: white;
    border-radius: 10px 10px 10px 10px;
    -webkit-border-radius: 10px 10px 10px 10px;
    -moz-border-radius: 10px 10px 10px 10px;
    box-shadow: 4px 4px 15px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 4px 4px 15px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 4px 4px 15px 0px rgba(0,0,0,0.75);
    input {
      font-size: 1.6rem;
    }

    animation-name: ${appear};
    animation-duration: .8s;
    animation-iteration-count: 1;
  }

  &.status-started .each:not(:last-child) {
    animation-name: ${smallDown};
    animation-duration: 1.2s;
    animation-iteration-count: 1;
  }

  .each {
    align-self: center;
    display: flex;
    
    input { 
      width: 60px;
    }
  }
`

type Props = {
  className?: string
};

export default StyledRunway;
