import React, { FC, useEffect, useRef, useState } from "react";
import { Problem, Solution, Task, TaskType } from "../types";
import {v4 as uuidv4} from 'uuid';
import { AbstractTaskFactory } from "../taskManager";
import styled from "styled-components";

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
  className,
  addends,
  submitted,
  initialValue,
  isCorrect,
  onSolve,
  solvedSum
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
      <div className={className}>
        <span>{addends[0]} + {addends[1]} = {solvedSum}</span>
        {isCorrect && <span role="img" aria-label="Correct!">✅</span>}
        {!isCorrect && <span role="img" aria-label="Wrong!">⛔</span>}
      </div>
    )
  }

  return (
    <form className={className} onSubmit={ handleSubmit }>
      <fieldset>
        {addends[0]} + {addends[1]} =
        <input value={value} type="number" ref={ inputRef } onChange={ handleChange} />
      </fieldset>
      <fieldset>
        <input type="submit" value="Ok" />
      </fieldset>
    </form>
  );
};

type Props = {
  className?: string
  addends: number[]
  submitted: boolean
  initialValue: string
  isCorrect?: boolean
  onSolve: (solution: AdditionSolution) => void
  solvedSum?: string
};

const StyledAddition = styled(Addition)`
  width: 9em;
  display: flex;
  justify-content: space-between;

  fieldset {
    padding: 0;
    border: 0;
  }
`
export default StyledAddition;

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
  
  return { addends, submitted, initialValue, onSolve, isCorrect }
}

export const createAddAdditionTaskAction = (): Task<TaskType.Addition, AdditionProblem, AdditionSolution> => {
  const max = 10
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
  

  const a = getRandomInt(max + 1)
  const b = getRandomInt(max + 1)

  const correct = [a, b].reduce((a, b) => a + b)
  const hints = [
     0,  1,  2,  3,  4,  5,  6,  7,  8,  9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20
  ]
    .filter(x => x !== correct)
    .slice(0, 3)
    .concat([correct])
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .map(n => ({ sum: n }))


  return {
    problem: {
      addends: [a, b],
    },
    taskId: uuidv4(),
    type: TaskType.Addition,
    hints,
  }
}

export const abstractAdditionTaskFactory: AbstractTaskFactory = {
  checkSolution: function (task: AdditionTask): boolean {
    if (task.solution === undefined) {
      throw new Error("solution cannot be checked as not provided yet")
    }
    const correctSum = task.problem.addends.reduce((a, b) => a + b)
    return task.solution.sum === correctSum
  },

  getPoints: (task: AdditionTask): number => task.problem.addends.reduce((a, b) => a + b)
} 