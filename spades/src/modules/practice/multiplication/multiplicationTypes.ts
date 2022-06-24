import { Problem, Solution, Task, TaskType } from "../types"

export interface MultiplicationProblem extends Problem<TaskType.Multiplication> {
  factors: number[]
}

export interface MultiplicationSolution extends Solution<TaskType.Multiplication> {
  product: number
}

export interface MultiplicationTask extends Task<
  TaskType.Multiplication,
  MultiplicationProblem,
  MultiplicationSolution
> {
  taskId: string
  type: TaskType.Multiplication
}