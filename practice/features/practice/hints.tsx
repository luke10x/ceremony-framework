import React, { FC } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSelected } from "../catalog/catalogSlice";
import { AdditionSolution, AdditionTask } from "./addition/addition";
import { addTask, applySolution, createApplySolutionAction, selectCurrentPractice } from "./practiceSlice";
import { createTask } from "./taskProvicer";
import { Solution, TaskType } from "./types";

const hintToStr = (taskType: TaskType, s: Solution<TaskType>) => {
  switch (taskType) {
    case TaskType.Addition:
      return (s as AdditionSolution).sum
    default:
      throw new Error("not available hint for task type: " + taskType)
  }
}

const Hints: FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectSelected);
  const addOneMore = (solution: Solution<TaskType>, taskId: string) => {
    dispatch(applySolution(createApplySolutionAction(solution, taskId)))
    dispatch(addTask(createTask(selected.config.taskConfigs)))

    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    setTimeout(
      () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
      400
    )
  }
  const practice = useAppSelector(selectCurrentPractice)
  const unsolvedTask = practice.practiceTasks.find(x => x.solution === undefined)

  return (
    <div className={className}> 
      {unsolvedTask?.hints.map((h, key) => (
        <button key={key} onClick={() => addOneMore(h, unsolvedTask.taskId)} className="hint">
          {hintToStr(unsolvedTask.type, h)}
        </button>
      ))}
    </div>
  )
}

interface Props {
  className?: string
}

const StyledHints = styled(Hints)`
  border: 0;
  display: flex;
  flex-wrap: wrap;
  .hint {
    flex: 1 0 40%; /* It must be less than 50%, actually much less because of padding */
    padding: 15px;
    margin: 5px;
    border: 1px dotted green;
    cursor: pointer;
  }

  /* for landscape view: */
  @media (min-aspect-ratio: 1/1) {
    .hint {
      flex: 1 0 100px;
    }
    background: #f9a;
  }
`

export default StyledHints
