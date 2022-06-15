import React, { ErrorInfo, FC } from "react";
import styled from "styled-components"
import PreviousPractices from "./previousPractices"
import { useRtkQueryResource } from './archiveSlice'

const logErrorToMyService = console.log

interface ErrorBoundaryProps {
  children?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState>  {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

const LoadingIndicator: FC<{}> = () => <h1>Lodaing previous practices...</h1>

const Archive: FC<Props> = function ({className}) {

  const PreviousPracticesResource = useRtkQueryResource()

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
