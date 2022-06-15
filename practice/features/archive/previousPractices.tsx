import React, { FC } from "react";
import styled from "styled-components"
import { WrappedData } from "../../app/useRktQueryResource";
import { PreviousPractice } from "./archiveSlice";

const PreviousPractices: FC<Props> = function ({className, resource}) {
  
  const result = resource.read()

  return (
    <div className={className}>
      {result.data.map((previousPractice, key) => (<div key={key}>
        {previousPractice.practiceType}
        ({previousPractice.points})
        error rate: {previousPractice.mistakes}/{previousPractice.solutions}
      </div>))}  
    </div>
  )
}

interface Props {
  className?: string,
  resource: { read: () => WrappedData<PreviousPractice[]> }
}

const StyledPreviousPractices = styled(PreviousPractices)`
  background: yellow;
`

export default StyledPreviousPractices
