import { createAddAdditionTaskAction } from "./addition/addition";
import { createMultiplicationTask } from "./multiplication/createMultiplicationTask";
import { TaskConfig, TaskType } from "./types";

export const createTask = (taskConfig: TaskConfig<TaskType>[]) => {
  const shuffled = taskConfig
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  
  const taskType = shuffled.at(0)

  switch (taskType?.type) {
    case TaskType.Addition:
      return createAddAdditionTaskAction()
    case TaskType.Multiplication:
      return createMultiplicationTask()

    default:
      throw new Error("not available task type: " + taskType?.type)
  }
}
