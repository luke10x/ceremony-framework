import React, { FC } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentPractice } from "./practiceSlice";

const FinishedPracticeDetails: FC<Props> = ({ className }) => {
  const practice = useAppSelector(selectCurrentPractice)
  practice.points
  return (
    <div className={className}>
      This practice is finished.
      <div>
        Score is: {practice.points}
      </div>
      <button
        className={`archivePractice`}
      >
      </button>
    </div>
  )
}

interface Props {
  className?: string
}

const StyledFinishedPracticeDetails = styled(FinishedPracticeDetails)`
  border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
 
`

export default StyledFinishedPracticeDetails
