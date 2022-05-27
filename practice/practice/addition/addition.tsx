import React, { FC, useEffect, useRef, useState } from "react";

export type AdditionProps = {
  addends: number[]
  submitted: boolean
  initialValue: string
  isCorrect?: boolean
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

export default Addition;
