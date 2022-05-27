import React, { FC } from "react";
import Addition, { AdditionSolution, AdditionTask, additionTaskToProps } from "./addition/addition";
import { Problem, Solution, Task, TaskType } from "./types";

const TaskSwitch: FC<Props> = function ({ task, onSolve }) {
  switch (task.type) {
    case TaskType.Addition:
      return (<div className="each" key={task.taskId}>
        <Addition {...additionTaskToProps(
          task as AdditionTask,
          onSolve as (solution: AdditionSolution) => void
        )}/>
      </div>)
    default:
      return (<div className="each" key={task.taskId}>
        what is the task type?
      </div>)
  }
}

type Props = {
  task: Task<Problem, Solution>
  onSolve: (solution: Solution) => void
};

export default TaskSwitch;
