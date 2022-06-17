import React, { FC } from "react";
import styled from "styled-components"
import { useGetPreviousPracticesSuspenseQuery } from "./archiveSlice";

const PreviousPractices: FC<Props> = function ({ className }) {
  
  const { data } = useGetPreviousPracticesSuspenseQuery()

  return (
    <div className={className}>
      {data?.map((previousPractice, key) => (<div key={key}>
        {previousPractice.practiceType}
        ({previousPractice.points})
        error rate: {previousPractice.mistakes}/{previousPractice.solutions}
      </div>))}  
    </div>
  )
}

interface Props {
  className?: string,
}

const StyledPreviousPractices = styled(PreviousPractices)`
  background: yellow;
`

export default StyledPreviousPractices
