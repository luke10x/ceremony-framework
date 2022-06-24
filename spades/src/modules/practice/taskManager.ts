import { abstractAdditionTaskFactory } from "./addition/addition";
import multiplicationFactory from "./multiplication";
import { Problem, Solution, Task, TaskComponentProps, TaskConfig, TaskType, TypedTask } from "./types";

export interface AbstractTaskFactory {
  taskComponent: (props: TaskComponentProps<TaskType>) => React.ReactElement
  solutionAsStr: (solution: Solution<TaskType>) => string
  createTask: () => TypedTask<TaskType> 
  checkSolution(task: Task<TaskType, Problem<TaskType>, Solution<TaskType>>): boolean
  getPoints(task: Task<TaskType, Problem<TaskType>, Solution<TaskType>>): number
}

export const createTaskFactoryByOneOfConfigs = (
  taskConfig: TaskConfig<TaskType>[]
): AbstractTaskFactory => {
  const shuffled = taskConfig
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)
  
  const taskType = shuffled.at(0)
  
  if (taskType === undefined) {
    throw new Error("Impossible, but failed to determine task type")
  }
  return createAbstractTaskFactory(taskType.type)
}

export const createAbstractTaskFactory = (taskType: TaskType): AbstractTaskFactory => {
  const f = abstractAdditionTaskFactory
  switch (taskType) {
    case TaskType.Addition:
      return abstractAdditionTaskFactory
    default:
      return multiplicationFactory
  }
}
