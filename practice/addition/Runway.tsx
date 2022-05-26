import React, { FC, useEffect, useReducer, useRef, useState } from "react";
import styled from 'styled-components';
import { keyframes } from 'styled-components'
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addTask, PracticeTask, selectWholePracticeState, SolutionForAdditionProblem, applySolution } from "./practiceSlice";
import {v4 as uuidv4} from 'uuid';
import { TaskType } from "./practiceSlice";

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

  return (
    <div className={`${className} status-${state.status}`}>
      {state.practiceTasks
        .filter(t => state.status === 'started' || t.gotSum !== undefined)
        .map((action) => (
          <div className="each" key={action.taskId}>
              <Addition
                  addends={action.problem.addends}
                  submitted={action.gotSum !== undefined}
                  initialValue={action.gotSum === undefined ? '' : String(action.gotSum) }
                  isCorrect={action.wantSum === action.gotSum}
                  onSubmit={(a: string) => addOneMore(Number(a), action.taskId)} />
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

type AdditionProps = {
  addends: number[]
  submitted: boolean
  initialValue: string
  isCorrect: boolean
  onSubmit: (value: string) => void
};

const Addition: FC<AdditionProps> = function ({
  addends,
  submitted,
  initialValue,
  isCorrect,
  onSubmit
}) {
  const [value, setValue] = useState<string>(initialValue);

  const handleSubmit = (event:  React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (value === '') {
      return
    }

    onSubmit(value);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }
  const handleChange = (event: any) => {
    const newVal = event.target.value
    setValue(newVal.substr(0,2))
  }

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  if (submitted) {
    return (
      <div>
        {addends[0]} + {addends[1]} = {value}
        {isCorrect && <span role="img" aria-label="Correct!">✅</span>}
        {!isCorrect && <span role="img" aria-label="Wrong!">⛔</span>}
      </div>
    )
  }

  return (
    <form onSubmit={ handleSubmit }>
      {addends[0]} + {addends[1]} =
      <input value={value} type="number" ref={ inputRef } onChange={ handleChange} />
      <input type="submit" value="Ok" />
    </form>
  );
};

export default StyledRunway;
