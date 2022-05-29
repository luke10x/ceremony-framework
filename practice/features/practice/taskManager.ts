import { abstractAdditionTaskFactory } from "./addition/addition";
import { Problem, Solution, Task, TaskType } from "./types";

export interface AbstractTaskFactory {
  checkSolution(task: Task<TaskType, Problem<TaskType>, Solution<TaskType>>): boolean
  getPoints(task: Task<TaskType, Problem<TaskType>, Solution<TaskType>>): number
}

export const createAbstractTaskFactory = (taskType: TaskType): AbstractTaskFactory => {
  const f = abstractAdditionTaskFactory
  switch (taskType) {
    case TaskType.Addition:
      return abstractAdditionTaskFactory
    default:
      throw new Error('Unknown task type')
  }
}
