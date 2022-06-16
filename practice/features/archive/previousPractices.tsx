import React, { FC } from "react";
import styled from "styled-components"
import { PreviousPractice } from "./archiveSlice";

const PreviousPractices: FC<Props> = function ({className, getPreviousPractices}) {
  
  const result = getPreviousPractices()

  return (
    <div className={className}>
      {result.map((previousPractice, key) => (<div key={key}>
        {previousPractice.practiceType}
        ({previousPractice.points})
        error rate: {previousPractice.mistakes}/{previousPractice.solutions}
      </div>))}  
    </div>
  )
}

interface Props {
  className?: string,
  getPreviousPractices: () => PreviousPractice[]
}

const StyledPreviousPractices = styled(PreviousPractices)`
  background: yellow;
`

export default StyledPreviousPractices
