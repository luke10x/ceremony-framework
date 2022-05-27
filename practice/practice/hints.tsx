import React, { FC } from "react";
import styled from "styled-components";

const Hints: FC<Props> = ({ className }) => {
  return (
    <div className={className}> 
      <button className="hint">2</button>
      <button className="hint">6</button>
      <button className="hint">11</button>
      <button className="hint">15</button>
    </div>
  )
}

interface Props {
  className?: string
}

const StyledHints = styled(Hints)`
  border: 0;
  display: flex;
  flex-wrap: wrap;
  .hint {
    flex: 1 0 40%; /* It must be less than 50%, actually much less because of padding */
    padding: 15px;
    margin: 5px;
    border: 1px dotted green;
  }

  /* for landscape view: */
  @media (min-aspect-ratio: 1/1) {
    .hint {
      flex: 1 0 100px;

    }
    background: #f9a;
  }
`

export default StyledHints
