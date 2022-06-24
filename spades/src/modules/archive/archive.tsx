import React, { FC } from "react";
import styled from "styled-components"
import PreviousPractices from "./previousPractices"
import { ErrorBoundary } from "../../app/errorBoundary";

const LoadingIndicator: FC<{}> = () => <h1>Lodaing previous practices...</h1>

const Archive: FC<Props> = function ({className}) {
  return (
    <>
      Client side only
      <ErrorBoundary>
        <React.Suspense fallback={<LoadingIndicator />}>
          <PreviousPractices />
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
