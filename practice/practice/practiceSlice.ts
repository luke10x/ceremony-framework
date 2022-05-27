import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { select } from '../catalog/catalogSlice';
import { Problem, Solution, Task, TaskType } from './types';

export interface ApplySolutionAction {
  taskId: string
  solution: Solution<TaskType>
}

export type PracticeStatus = 'not-started' | 'started' | 'finished'

export interface PracticeState {
  current: {
    practiceId: string
    status: PracticeStatus
    practiceTasks: Task<TaskType, Problem<TaskType>, Solution<TaskType>>[]  
  }
};

const initialState: PracticeState = {
  current: {
    practiceId: '',
    status: 'not-started',
    practiceTasks: [],
  }
};

// Reducers:

const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    start: state => {
      if (state.current.status === 'not-started') {
        state.current.status = 'started';
      }
    },
    finish: state => {
      if (state.current.status === 'started') {
        state.current.status = 'finished';
      }
    },
    addTask: (
      state, 
      action: PayloadAction<Task<TaskType, Problem<TaskType>, Solution<TaskType>>>
    ) => {
      if (state.current.status === 'started') {
        state.current.practiceTasks.push(action.payload);
      }
    },
    applySolution: (state, action: PayloadAction<ApplySolutionAction>) => {
      if (state.current.status === 'started') {
        const task = state.current.practiceTasks.find((t) => t.taskId == action.payload.taskId)
        if (task) {
          task.solution = action.payload.solution
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(select, state => {
      state.current.status = "not-started"
      state.current.practiceTasks = []
    });
  }
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
  solution: Solution<TaskType>,
  taskId: string
): ApplySolutionAction => ({
    taskId: taskId,
    solution,
})

// Selectors: 

export const selectCurrentPractice = (state: RootState) => state.practice.current;
