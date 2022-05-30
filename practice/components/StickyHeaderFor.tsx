import React, { FC } from "react";
import styled from "styled-components";

type StickyHeaderForProps = {
  className?: string
  children?: React.ReactNode
  header: React.ReactNode
}

const StickyHeaderFor: FC<StickyHeaderForProps> = function ({
  className, children, header
}) {
  const Header = header
  return (<div className={className}>
    <nav className="sticky">
      {header}
    </nav>
    <div className="content">
      {children}
    </div>
  </div>)
}

const StyledStickyHeaderFor = styled(StickyHeaderFor)`
  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
  .content {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  }

  display: flex;
  flex-direction: column;
  height: 100vh;
  border: 3px solid brown;
`
export default StyledStickyHeaderFor;