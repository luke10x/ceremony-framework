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
    <main>
      {children}
    </main>
  </div>)
}

const StyledStickyHeaderFor = styled(StickyHeaderFor)`
  .sticky {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
`
export default StyledStickyHeaderFor;