import React, { FC } from "react";
import styled from "styled-components"

const Archive: FC<Props> = function ({className}) {
  return <div className={className}>archive.zip</div>
}

interface Props {
  className?: string
}

const StyledCatalog = styled(Archive)`
  background: yellow;
`

export default StyledCatalog
