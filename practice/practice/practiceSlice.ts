import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { Problem, Solution, Task, TaskType } from './types';

export interface ApplySolutionAction {
  taskId: string
  solution: Solution
}

export type PracticeStatus = 'not-started' | 'started' | 'finished'

export interface PracticeState {
  practiceId: string
  status: PracticeStatus
  practiceType: TaskType
  practiceTasks: Task<Problem, Solution>[]
};

const initialState: PracticeState = {
  practiceId: '',
  status: 'not-started',
  practiceType: TaskType.Addition,
  practiceTasks: [],
};

// Reducers:

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
    addTask: (state, action: PayloadAction<Task<Problem, Solution>>) => {
      if (state.status === 'started') {
        state.practiceTasks.push(action.payload);
      }
    },
    applySolution: (state, action: PayloadAction<ApplySolutionAction>) => {
      if (state.status === 'started') {
        const task = state.practiceTasks.find((t) => t.taskId == action.payload.taskId)
        if (task) {
          task.solution = action.payload.solution
        }
      }
    }
  }, 
});

export default practiceSlice.reducer;

// Actions:

export const {
  start,
  finish,
  addTask,
  applySolution,
} = practiceSlice.actions;

export const createApplySolutionAction = (
  solution: Solution,
  taskId: string
): ApplySolutionAction => ({
    taskId: taskId,
    solution,
})

// Selectors: 

export const selectWholePracticeState = (state: RootState) => state.practice;
