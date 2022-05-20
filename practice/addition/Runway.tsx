import React, { FC, FunctionComponent, useEffect, useReducer, useRef, useState } from "react";
import styles from "./addition.module.css";


function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

////

type Action = {
  addends: number[];
  submitted: boolean;
}; 
type State = Action[] 

const Runway: FC<Props> = ({ max }) => {
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
    <div>
      loop
      {state.map((action: Action, index: number) => ((
        <div key={index}>
          <Addition addends={action.addends} onSubmit={(a: number) => addOneMore(a)} />
        </div>
      )))}
    </div>
  )
} 

type Props = {
  max: number;
};

type AdditionProps = {
  addends: number[];
  onSubmit: (value: number) => void;
};

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
        {isCorrect && 'Correct'}
        {!isCorrect && 'Wrong'}
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


export default Runway;