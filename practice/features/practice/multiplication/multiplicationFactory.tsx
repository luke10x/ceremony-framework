import { AbstractTaskFactory } from "../taskManager"
import { Solution, TaskType } from "../types"
import { createMultiplicationTask } from "./createMultiplicationTask"
import Multiplication, { multiplicationTaskToProps } from "./multiplication"
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
  ) => (s as MultiplicationSolution).product.toString(),
  taskComponent: ({ task, onSolve, className }) => (
    <Multiplication className={className}
      {...multiplicationTaskToProps(
        task as MultiplicationTask,
        onSolve as (solution: MultiplicationSolution) => void
      )}
      solvedSum={(task as MultiplicationTask).solution?.product.toString()} />
  )
}