import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

export type PracticeStatus = 'not-started' | 'started' | 'finished'
export interface PracticeState {
  status: PracticeStatus
};


const initialState: PracticeState = {
  status: 'not-started'
};

const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    start: state => {
      if (state.status === 'not-started') {
        state.status = 'started';
      }
    },
    // decrement: state => {
    //   state.value--;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
});

export const {
  start, 
} = practiceSlice.actions;

export const selectWholePracticeState = (state: RootState) => state.practice;

export default practiceSlice.reducer;
