export interface Solution {}

export interface Problem {}

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

export interface Task<P extends Problem, S extends Solution> {
  taskId: string
  type: TaskType
  problem: P
  solution?: S,
}

interface AdditionProblem extends Problem {
  addends: number[]
}

interface AdditionSolution extends Solution {
  sum: number
}

export interface AdditionTask extends Task<AdditionProblem, AdditionSolution> {
  taskId: string
  type: TaskType.Addition
}

const t1: AdditionTask = {
  taskId: "",
  type: TaskType.Addition,
  problem: {
    addends: [1, 2]
  }
}
