import React, { FC, useEffect, useReducer, useRef, useState } from "react";
import styled from 'styled-components';
import { keyframes } from 'styled-components'
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addTask, PracticeTask, selectWholePracticeState, SolutionForAdditionProblem, applySolution } from "./practiceSlice";
import {v4 as uuidv4} from 'uuid';
import { TaskType } from "./practiceSlice";
import Addition, { AdditionProps } from "./addition/addition";
import { AdditionTask } from "./types";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const createApplySolutionAction = (
  answer: number,
  taskId: string
): SolutionForAdditionProblem => ({
    taskId: taskId,
    type: TaskType.Addition,
    sum: answer,
})

const createAddTaskAction = (max: number): PracticeTask => {
  const a = getRandomInt(max + 1)
  const b = getRandomInt(max + 1)
  return {
    problem: {
      addends: [a, b],
    },
    taskId: uuidv4(),
    type: TaskType.Addition,
    wantSum: a + b,
  }
}

const Runway: FC<Props> = function ({ className, max }) {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectWholePracticeState);

  const isInitialRender = useRef(true);// in react, when refs are changed component dont re-render 

  const addOneMore = (answer: number, taskId: string) => {
    dispatch(applySolution(createApplySolutionAction(answer, taskId)))
    dispatch(addTask(createAddTaskAction(max)))
  }

  useEffect(() => {
    if(isInitialRender.current){// skip initial execution of useEffect
      isInitialRender.current = false;// set it to false so subsequent changes of dependency arr will make useEffect to execute
      return;
    }

    dispatch(addTask(createAddTaskAction(max)))
  }, []);


  // const additionTaskToProps = (task: AdditionTask): AdditionProps => {


  //   const addends = task.problem.addends
  //   const submitted = task.gotSum !== undefined
  //   const initialValue = task.gotSum === undefined ? '' : String(task.gotSum)
  //   const isCorrect = task.solution?.sum === task.gotSum
  //   const onSubmit = (a: string) => addOneMore(Number(a), task.taskId)

  //   return {
  //     addends, submitted, initialValue, onSubmit
  //   }
  // }


  return (
    <div className={`${className} status-${state.status}`}>
      {state.practiceTasks
        .filter(t => state.status === 'started' || t.gotSum !== undefined)
        .map((task) => (
          <div className="each" key={task.taskId}>

            <Addition
                addends={task.problem.addends}
                submitted={task.gotSum !== undefined}
                initialValue={task.gotSum === undefined ? '' : String(task.gotSum) }
                isCorrect={task.wantSum === task.gotSum}
                onSubmit={(a: string) => addOneMore(Number(a), task.taskId)} />
          </div>
        ))
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
  max: number
};

export default StyledRunway;
