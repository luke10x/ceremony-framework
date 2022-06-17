import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
import useEventListener from 'use-typed-event-listener'
import { MultiplicationSolution, MultiplicationTask } from "./multiplicationTypes";

const Multiplication: FC<Props> = function ({
  className,
  factors,
  submitted,
  initialValue,
  isCorrect,
  onSolve,
  solvedSum
}) {

  const [value, setValue] = useState<string>(initialValue);

  const inputRef = useRef<HTMLInputElement>(null);
 
  if (typeof window !== "undefined") {
    useEventListener(window, 'keypress', (e) => {
      if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(e.key)) {
        e.preventDefault()

        if (inputRef.current === null) {
          return;
        }
        inputRef.current.focus();
        setValue(value + e.key);
      }
    })
  }

  const handleSubmit = (event:  React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (value === '') {
      return
    }

    onSolve({
      product: Number(value)
    });
  }
  const handleChange = (event: any) => {
    event.preventDefault()
    const newVal = event.target.value
    setValue(newVal.substr(0,2))
  }
  
  if (submitted) {
    return (
      <div className={`submitted ${className}`}>
        <span className={isCorrect ? 'correct' : 'wrong'}>
          {factors[0]} × {factors[1]} = {solvedSum}
        </span>
        {isCorrect && <span role="img" aria-label="Correct!">✅</span>}
        {!isCorrect && <span role="img" aria-label="Wrong!">⛔</span>}
      </div>
    )
  }

  return (
    <form className={`not-submitted ${className}`} onSubmit={ handleSubmit }>
      <fieldset>
        {factors[0]} × {factors[1]} =
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
  factors: number[]
  submitted: boolean
  initialValue: string
  isCorrect?: boolean
  onSolve: (solution: MultiplicationSolution) => void
  solvedSum?: string
};

const StyledMultiplication = styled(Multiplication)`
  display: flex;

  &.submitted {
    width: 6em;
    justify-content: space-between;
  }
  &.not-submitted {
    width: 12em;
    justify-content: space-evenly;
  }
  span.wrong {
    text-decoration: line-through;
  }

  fieldset {
    padding: 0;
    border: 0;

    display: flex;
    font-size: 1.8rem;
    input {
      font-size: 1.8rem;
    }
    
    input { 
      &[type="number"] {
        width: 60px;
      }
      &[type="submit"] {
        font-family: 'Dekko';
        font-size: 0.8rem;
        height: 100%;
        width: 3rem;
      }
    }
  }

  -webkit-touch-callout: none; /* Safari */
  -webkit-user-select: none; /* Chrome */     
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; 
`
export default StyledMultiplication;

export const multiplicationTaskToProps = (
  task: MultiplicationTask,
  onSolve: (solution: MultiplicationSolution) => void
): Props => {
  const factors = task.problem.factors
  const submitted = task.solution !== undefined
  const initialValue = task.solution === undefined
    ? ''
    : String(task.solution.product)
  const isCorrect = task.solution?.product === task.problem.factors.reduce((a, b) => a * b)
  
  return { factors, submitted, initialValue, onSolve, isCorrect }
}
