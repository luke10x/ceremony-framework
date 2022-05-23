import { FC, useState } from 'react';
import styled from 'styled-components';
import {
  useAppDispatch,
  useAppSelector,
} from '../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  selectCount,
} from './counterSlice';

type CounterProps = {
  className?: string
}

const Counter: FC<CounterProps> = function ({className}) {  
    const dispatch = useAppDispatch();
    const count = useAppSelector(selectCount);
    const [incrementAmount, setIncrementAmount] = useState<number>(0);
  
    return (
      <div className={className}>
        <p>
          The current number is {count}
        </p>
        <div>
          <input
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(Number(e.target.value))}
            type="number"
          />
          <button
            onClick={() =>        dispatch(incrementByAmount(Number(incrementAmount)))}
          >
            Increment by amount
          </button>
        </div>
        <div>
          <button onClick={() => dispatch(decrement())}>Decrement by 1</button>
          <button onClick={() => dispatch(increment())}>Increment by 1</button>
        </div>
      </div>
    );
}

const StyledCounter = styled(Counter)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  font-size: 2rem;
  background-color: #ffffffe9;
  box-shadow: -1px 7px 15px -10px rgba(0,0,0,0.75);
  -webkit-box-shadow: -1px 7px 15px -10px rgba(0,0,0,0.75);
  -moz-box-shadow: -1px 7px 15px -10px rgba(0,0,0,0.75);
`
export default StyledCounter;