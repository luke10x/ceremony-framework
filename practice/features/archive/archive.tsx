import React, { FC } from "react";
import styled from "styled-components"
import PreviousPractices from "./previousPractices"
import { usePreviousPractices } from './archiveSlice'
import { ErrorBoundary } from "../../app/errorBoundary";

const LoadingIndicator: FC<{}> = () => <h1>Lodaing previous practices...</h1>

const Archive: FC<Props> = function ({className}) {

  const PreviousPracticesResource = usePreviousPractices()

  return (
    <>
      Client side only
      <ErrorBoundary>
        <React.Suspense fallback={<LoadingIndicator />}>
          <PreviousPractices resource={PreviousPracticesResource} />
        </React.Suspense>
      </ErrorBoundary>
    </>
  )
}

interface Props {
  className?: string,
}

const StyledArchive = styled(Archive)`
  border: 1px solid red;
`

export default StyledArchive
