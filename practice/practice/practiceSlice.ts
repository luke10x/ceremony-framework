import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { json } from 'stream/consumers';
import type { RootState } from '../app/store';
import { CatalogOption, select } from '../catalog/catalogSlice';
import { createAbstractTaskFactory } from './taskManager';
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
    durationInMs: number
    startedAt?: number
    points: number
  }
};

// const createAbstractTaskFactory = (taskType: TaskType) => {}

const initialState: PracticeState = {
  current: {
    practiceId: '',
    status: 'not-started',
    practiceTasks: [],
    durationInMs: 10000,
    points: 0
  }
};

// Reducers:

const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<Number>) => {
      if (state.current.status === 'not-started') {
        state.current.status = 'started';
        state.current.startedAt = action.payload.valueOf()
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
        state.current.practiceTasks
          = state.current.practiceTasks.filter(t => t.solution !== undefined)
      
        state.current.practiceTasks.push(action.payload);
      }
    },
    applySolution: (state, action: PayloadAction<ApplySolutionAction>) => {
      if (state.current.status === 'started') {
        const task = state.current.practiceTasks.find((t) => t.taskId == action.payload.taskId)
        if (task) {
          task.solution = action.payload.solution

          // myFunction()
          const f = createAbstractTaskFactory(task.type)

          const isCorrect = f.checkSolution(task)
          const points = isCorrect
            ? state.current.points + f.getPoints(task)
            : Math.max(0, state.current.points - f.getPoints(task))
          state.current.points = points
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(select, (state, action: PayloadAction<CatalogOption>) => {
      
      let current = {...initialState.current}
      current.durationInMs = action.payload.config.timeboxSeconds * 1000

      state.current = current
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
