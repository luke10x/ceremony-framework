import React, { FC } from "react";
import styled, { keyframes } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectSelected } from "../catalog/catalogSlice";
import { addTask, applySolution, createApplySolutionAction, selectCurrentPractice } from "./practiceSlice";
import { createTaskFactoryByOneOfConfigs } from "./taskManager";
import { Solution, TaskType } from "./types";
import { deepScroll } from "./utils";

const Hints: FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(selectSelected);
  const f = createTaskFactoryByOneOfConfigs(selected.config.taskConfigs)

  const addOneMore = (solution: Solution<TaskType>, taskId: string) => {
    dispatch(applySolution(createApplySolutionAction(solution, taskId)))
    dispatch(addTask(f.createTask()))

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
            {f.solutionAsStr(h)}
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

  button.hint:active {
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
