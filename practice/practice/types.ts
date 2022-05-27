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

