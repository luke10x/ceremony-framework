import React, { FC } from "react";
import styled from "styled-components"
import { useGetAllPreviousPracticesQuery } from "./archiveSlice";

const Archive: FC<Props> = function ({className}) {
  
  const { data, error, isLoading } = useGetAllPreviousPracticesQuery(null)
  
  return (
    <div className={className}>
      
      {isLoading && <h1>Loading............</h1>}  
      
      {error && <div>error occured</div>}

      {data && data.map((previousPractice, key) => (<div key={key}>
        {previousPractice.practiceType}
        ({previousPractice.points})
        error rate: {previousPractice.mistakes}/{previousPractice.solutions}
      </div>))}
    
    </div>
  )
}

interface Props {
  className?: string
}

const StyledArchive = styled(Archive)`
  background: yellow;
`

export default StyledArchive
