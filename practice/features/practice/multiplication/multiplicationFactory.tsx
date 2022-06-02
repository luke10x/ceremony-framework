import { AdditionSolution } from "../addition/addition"
import { AbstractTaskFactory } from "../taskManager"
import { Solution, TaskType } from "../types"
import { createMultiplicationTask } from "./createMultiplicationTask"
import { MultiplicationSolution, MultiplicationTask } from "./multiplicationTypes"

export const multiplicationFactory: AbstractTaskFactory = {
  checkSolution: function (task: MultiplicationTask): boolean {
    if (task.solution === undefined) {
      throw new Error("solution cannot be checked as not provided yet")
    }
    const correct = task.problem.factors.reduce((a, b) => a * b)
    return task.solution.product === correct
  },

  getPoints: (
    task: MultiplicationTask
  ): number => task.problem.factors.reduce((a, b) => a * b),

  createTask: createMultiplicationTask,
  solutionAsStr: (
    s: Solution<TaskType>
  ) => (s as MultiplicationSolution).product.toString()

}