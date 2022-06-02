import { AbstractTaskFactory } from "../taskManager"
import { createMultiplicationTask } from "./createMultiplicationTask"
import { MultiplicationTask } from "./multiplicationTypes"

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

  createTask: createMultiplicationTask
}