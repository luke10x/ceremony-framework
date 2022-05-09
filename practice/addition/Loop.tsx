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

const Loop: FC<Props> = ({ max }) => {

  // const [ addends, setAddends ] = useState<number[]>([0, 0])
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
      // addends: [0, 0],
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
      // addends: [0, 0],
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
/////

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
  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit(9);
  }
  const handleChange = (event: any) => {
    setValue(event.target.value)
  }
  if (submitted) {
    const isCorrect = value == addends.reduce((a, b) => a + b)
    return (
      <div>
        {addends[0]} + {addends[1]} = {value}
        {isCorrect && 'Correct'}
        {!isCorrect && 'Wrong'}
      </div>
    )
  }

  return (
    <div className={styles.additionWrapper}>
      {addends[0]} + {addends[1]} = <input value={value} onChange={ handleChange} />
      <button onClick={ handleSubmit }>Ok</button>
    </div>
  );
};


export default Loop;