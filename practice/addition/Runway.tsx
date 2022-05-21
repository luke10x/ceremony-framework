import React, { FC, FunctionComponent, useEffect, useReducer, useRef, useState } from "react";
// import styles from "./addition.module.css";
import styled from 'styled-components';
import { keyframes } from 'styled-components'

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

////

type Action = {
  addends: number[];
  submitted: boolean;
}; 
type State = Action[] 

const Runway: FC<Props> = ({ className, max }) => {
  const [ state, dispatch ] = useReducer(
    (oldstate: State, action: Action): State => {
      return [...oldstate, action];
    },
    []
  )
  const isInitialRender = useRef(true);// in react, when refs are changed component dont re-render 

  const addOneMore = (answer: number) => {
    dispatch({
      addends: [getRandomInt(max + 1), getRandomInt(max + 1)],
      submitted: false
    })
  }
  useEffect(() => {
    if(isInitialRender.current){// skip initial execution of useEffect
      isInitialRender.current = false;// set it to false so subsequent changes of dependency arr will make useEffect to execute
      return;
    }
    dispatch({
      addends: [getRandomInt(max + 1), getRandomInt(max + 1)],
      submitted: false
    })
  }, []);

  return (
    <div className={className}>
      {state.map((action: Action, index: number) => ((
        <div className="each" key={index}>
          <Addition addends={action.addends} onSubmit={(a: number) => addOneMore(a)} />
        </div>
      )))}
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

  .each:last-child {
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
  .each:not(:last-child) {
    animation-name: ${smallDown};
    animation-duration: 1.2s;
    animation-iteration-count: 1;
  }

  .each {
    align-self: center;
    display: flex;
    
    div {
    }
    input { 
      width: 60px;
    }
  }
`

type Props = {
  className?: string;
  max: number;
};

type AdditionProps = {
  addends: number[];
  onSubmit: (value: number) => void;
};

const styles = {
  answerCorrect: '',
  answerWrong: '',
  additionWrapper: ''
}
const Addition: FC<AdditionProps> = function ({ addends, onSubmit }) {
  const [value, setValue] = useState<number|''>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const handleSubmit = (event:  React.SyntheticEvent<HTMLFormElement>) => {
    if (value === '') {
      event.preventDefault()
      return
    }

    setSubmitted(true);
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
    const isCorrect = value == addends.reduce((a, b) => a + b)
    return (
      <div className={isCorrect ? styles.answerCorrect : styles.answerWrong}>
        {addends[0]} + {addends[1]} = {value}
        {isCorrect && <span role="img" aria-label="Correct!">✅</span>}
        {!isCorrect && <span role="img" aria-label="Wrong!">⛔</span>}
      </div>
    )
  }
  return (
    <form className={styles.additionWrapper} onSubmit={ handleSubmit }>
      {addends[0]} + {addends[1]} =
      <input value={value} type="number" ref={ inputRef } onChange={ handleChange} />
      <input type="submit" value="Ok" />
    </form>
  );
};


export default StyledRunway;