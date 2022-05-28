import React, { FC, useEffect, useRef, useState } from "react";
import { Problem, Solution, Task, TaskType } from "../types";
import {v4 as uuidv4} from 'uuid';

export interface AdditionProblem extends Problem<TaskType.Addition> {
  addends: number[]
}

export interface AdditionSolution extends Solution<TaskType.Addition> {
  sum: number
}

export interface AdditionTask extends Task<TaskType.Addition, AdditionProblem, AdditionSolution> {
  taskId: string
  type: TaskType.Addition
}

const Addition: FC<Props> = function ({
  addends,
  submitted,
  initialValue,
  isCorrect,
  onSolve
}) {
  const [value, setValue] = useState<string>(initialValue);

  const handleSubmit = (event:  React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (value === '') {
      return
    }

    onSolve({
      sum: Number(value)
    });
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

type Props = {
  addends: number[]
  submitted: boolean
  initialValue: string
  isCorrect?: boolean
  onSolve: (solution: AdditionSolution) => void
};

export default Addition;

export const additionTaskToProps = (
  task: AdditionTask,
  onSolve: (solution: AdditionSolution) => void
): Props => {
  const addends = task.problem.addends
  const submitted = task.solution !== undefined
  const initialValue = task.solution === undefined
    ? ''
    : String(task.solution.sum)
  const isCorrect = task.solution?.sum === task.problem.addends.reduce((a, b) => a + b)
  
  return { addends, submitted, initialValue, onSolve, isCorrect}
}

export const createAddAdditionTaskAction = (): Task<TaskType.Addition, AdditionProblem, AdditionSolution> => {
  const max = 10
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  
  const a = getRandomInt(max + 1)
  const b = getRandomInt(max + 1)
  return {
    problem: {
      addends: [a, b],
    },
    taskId: uuidv4(),
    type: TaskType.Addition,
  }
}
