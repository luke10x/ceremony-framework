import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

type AdditionPracticeTask = {
  taskId: string
  type: TaskType.Addition
  problem: {
    addends: number[]
  }
  wantSum: number
  gotSum?: number
}

type AdditionSolution = {
  taskId: string
  type: TaskType.Addition
  sum: number
}

export type TaskSolution = AdditionSolution

export type SolutionForAdditionProblem = AdditionSolution

export type PracticeTask = AdditionPracticeTask

export type PracticeStatus = 'not-started' | 'started' | 'finished'

export interface PracticeState {
  practiceId: string
  status: PracticeStatus
  practiceType: TaskType
  practiceTasks: PracticeTask[]
};

export enum TaskType {
  Addition = 'ADDITION',
  Multiplication = 'MULTIPLICATION',
}

export function deserializeTaskType(str: any): TaskType {
  switch (str) {
    case 'ADDITION':
      return TaskType.Addition;
    case 'MULTIPLICATION':
      return TaskType.Multiplication;
    default:
      throw new Error(`Cannot parse "${str}" to type`)
  }
}

const initialState: PracticeState = {
  practiceId: '',
  status: 'not-started',
  practiceType: TaskType.Addition,
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
    addTask: (state, action: PayloadAction<PracticeTask>) => {
      if (state.status === 'started') {
        state.practiceTasks.push(action.payload);
      }
    },
    applySolution: (state, action: PayloadAction<TaskSolution>) => {
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
  addTask,
  applySolution,
} = practiceSlice.actions;

export const selectWholePracticeState = (state: RootState) => state.practice;

export default practiceSlice.reducer;
