import { createReducer } from '@reduxjs/toolkit';
import {
  decrement,
  increment,
  incrementByAmount,
} from './actions';

// declaring the types for our state
export type EnterprizeCounterState = {
  value: number;
};

const initialState: EnterprizeCounterState = {
  value: 0,
};

export const enterprizeCounterReducer = createReducer(initialState, builder => {
  builder
    .addCase(increment, state => {
      state.value++;
      state.value++;
    })
    .addCase(decrement, state => {
      state.value--;
      state.value--;
    })
    .addCase(incrementByAmount, (state, action) => {
      state.value += action.payload;
      state.value += action.payload;
    });
});