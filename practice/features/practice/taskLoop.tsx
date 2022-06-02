import React, { FC, useEffect, useRef } from "react";
import styled from 'styled-components';
import { keyframes } from 'styled-components'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addTask, selectCurrentPractice, applySolution, createApplySolutionAction } from "./practiceSlice";
import { Solution, TaskType } from "./types";
import TaskSwitch from "./taskSwitch";
import { selectSelected } from "../catalog/catalogSlice";
import { deepScroll } from "./utils";
import { createTaskFactoryByOneOfConfigs } from "./taskManager";

const TaskLoop: FC<Props> = function ({ className }) {
  const dispatch = useAppDispatch();
  const practice = useAppSelector(selectCurrentPractice);
  const selected = useAppSelector(selectSelected);
  const f = createTaskFactoryByOneOfConfigs(selected.config.taskConfigs)

  const addOneMore = (solution: Solution<TaskType>, taskId: string) => {
    dispatch(applySolution(createApplySolutionAction(solution, taskId)))
    dispatch(addTask(f.createTask()))

    deepScroll()
  }

  useEffect(() => {
    dispatch(addTask(f.createTask()))
    deepScroll()
  }, []);

  return (
    <div className={`${className} status-${practice.status}`}>
      {practice.practiceTasks
        .filter(t => practice.status === 'started' || t.solution !== undefined)
        .map((task, key) => {
          const onSolve = (solution: Solution<TaskType>) => addOneMore(solution, task.taskId)
          return <TaskSwitch key={key} task={task} onSolve={onSolve} />
        })
      }
    </div>
  )
}

type Props = {
  className?: string
};

const smallDown = keyframes`
  0% {
    font-size: 1.8rem;
    border-color: rgba(100, 100, 100, .2);
    
  }
  100% {
    font-size: 1.2rem;
    border-color: rgba(100, 100, 100, 0);
  }
`

const appear = keyframes`
  0% {
    transform: scale(0.7);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`

const StyledTaskLoop = styled(TaskLoop)`
  display: flex;
  flex-direction: column;

  justify-content: start;

  flex: 1 0 auto;

  padding: 20px;

  &.status-started .each:last-child {
    border: 1px solid #ccc;
  
    padding: 20px;
    margin: 20px;
    font-size: 1.8rem;

    background: white;
    border-radius: 10px 10px 10px 10px;
    -webkit-border-radius: 10px 10px 10px 10px;
    -moz-border-radius: 10px 10px 10px 10px;
    box-shadow: 4px 4px 15px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 4px 4px 15px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 4px 4px 15px 0px rgba(0,0,0,0.75);
    input {
      font-size: 1.8rem;
    }

    animation-name: ${appear};
    animation-duration: .8s;
    animation-iteration-count: 1;
  }

  &.status-started .each:not(:last-child) {
    border-style: solid;
    border-width: 1px;
    border-radius: 10px;
    border-color: rgba(100, 100, 100, 0);

    animation-name: ${smallDown};
    animation-duration: .8s;
    animation-iteration-count: 1;
  }

  .each {
    align-self: center;
    display: flex;
    
    input { 
      width: 60px;
    }
  }
`

export default StyledTaskLoop;
