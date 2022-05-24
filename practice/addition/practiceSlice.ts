import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

type AdditionPracticeTask = {
  taskId: string
  type: 'addition'
  addends: number[]
  wantSum: number
  gotSum?: number
}

type AdditionTaskSolution = {
  taskId: string
  type: 'addition'
  sum: number
}

export type TaskSolution = AdditionTaskSolution
export type PracticeTask = AdditionPracticeTask
export type PracticeStatus = 'not-started' | 'started' | 'finished'
export interface PracticeState {
  practiceId: string
  status: PracticeStatus
  practiceType: 'addition'
  practiceTasks: PracticeTask[]
};


const initialState: PracticeState = {
  practiceId: '',
  status: 'not-started',
  practiceType: 'addition',
  practiceTasks: [],
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
    finish: state => {
      if (state.status === 'started') {
        state.status = 'finished';
      }
    },
    addPracticeTask: (state, action: PayloadAction<PracticeTask>) => {
      if (state.status === 'started') {
        state.practiceTasks.push(action.payload);
      }
    },
    trySolutionForPracticeTask: (state, action: PayloadAction<TaskSolution>) => {
      if (state.status === 'started') {
        const task = state.practiceTasks.find((t) => t.taskId == action.payload.taskId)
        if (task) {
          task.gotSum = action.payload.sum
        }
      }
    }
  }, 
});

export const {
  start,
  finish,
  addPracticeTask,
  trySolutionForPracticeTask
} = practiceSlice.actions;

export const selectWholePracticeState = (state: RootState) => state.practice;

export default practiceSlice.reducer;
