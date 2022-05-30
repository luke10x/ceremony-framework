import React, { FC, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSelected } from "../catalog/catalogSlice";
import { AdditionSolution, AdditionTask } from "./addition/addition";
import { addTask, applySolution, createApplySolutionAction, selectCurrentPractice } from "./practiceSlice";
import { createTask } from "./taskProvicer";
import { Solution, TaskType } from "./types";
import { deepScroll } from "./utils";

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

    deepScroll()
  }
  const practice = useAppSelector(selectCurrentPractice)
  const unsolvedTask = practice.practiceTasks.find(x => x.solution === undefined)

  return (
    <div className={className}> 
      {unsolvedTask?.hints.map((h, key) => {
        const time = (new Date()).getTime().valueOf().toString()

        return (
          <button
            key={key + time}
            onClick={() => addOneMore(h, unsolvedTask.taskId)}
            className={`hint`}
          >
            {hintToStr(unsolvedTask.type, h)}
          </button>
        )
      }
      
      )}
    </div>
  )
}

interface Props {
  className?: string
}

const grow = keyframes`
  0% { opacity: 0%; }
  50% { opacity: 0%; }
  100% { opacity: 100%; }
`

const StyledHints = styled(Hints)`
  border: 0;
  display: flex;
  flex-wrap: wrap;

  button.hint:active,
  button.hint:hover {
    background: red;
  }
  button.hint:focus,
  button.hint:visited,

  button.hint:hover {
    background: gold;
  }
  .hint {
    border-radius: 3px;
    flex: 1 0 40%; /* It must be less than 50%, actually much less because of padding */
    padding: 15px;
    margin: 5px;
    border: 1px dotted gray;
    cursor: pointer;
    background: #f9a;

    animation-name: ${grow};
    animation-duration: 0.8s;
    animation-iteration-count: 1;
  }

  /* for landscape view: */
  @media (min-aspect-ratio: 1/1) {
    .hint {
      flex: 1 0 100px;
    }
  }

  -webkit-touch-callout: none; /* Safari */
  -webkit-user-select: none; /* Chrome */     
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; 
`

export default StyledHints
