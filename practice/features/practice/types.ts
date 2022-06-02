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

export interface Solution<T extends TaskType> {}

export interface Problem<T extends TaskType> {}

export interface Task<
  T extends TaskType,
  P extends Problem<T>,
  S extends Solution<T>
> {
  taskId: string
  type: T
  problem: P
  solution?: S,
  hints: S[],
}

export type TypedTask<T extends TaskType> = Task<T, Problem<T>, Solution<T>>

export interface TaskConfig<T extends TaskType> {
  type: T
}

export interface PracticeConfig {
  timeboxSeconds: number
  taskConfigs: TaskConfig<TaskType>[]
}