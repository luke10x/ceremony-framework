import React, { FC } from "react";
import Addition, { AdditionSolution, AdditionTask, additionTaskToProps } from "./addition/addition";
import { Problem, Solution, Task, TaskConfig, TaskType } from "./types";

const TaskSwitch: FC<Props<TaskType>> = function ({ task, onSolve }) {
  switch (task.type) {
    case TaskType.Addition:
      return (<div className="each" key={task.taskId}>
        <Addition {...additionTaskToProps(
          task as AdditionTask,
          onSolve as (solution: AdditionSolution) => void
        )} solvedSum={(task as AdditionTask).solution?.sum.toString()} />
      </div>)
    default:
      return (<div className="each" key={task.taskId}>
        what is the task type?
      </div>)
  }
}

type Props<T extends TaskType> = {
  task: Task<T, Problem<T>, Solution<T>>
  onSolve: (solution: Solution<T>) => void
};

export default TaskSwitch;
