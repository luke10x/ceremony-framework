import React, { FC } from "react";
import { TaskType } from "../practice/types";
import styled from "styled-components";
import { useRouter } from "next/router";
import { CatalogOption, select } from "./catalogSlice";
import { useAppDispatch } from "../../app/hooks";
import Link from "next/link";

const options: CatalogOption[] = [
  {
    title: "Practice addition for 30 seconds",
    config: {
      timeboxSeconds: 30,
      taskConfigs: [{ type: TaskType.Addition }],
    }
  },
  {
    title: "Practice multiplication for 30 seconds",
    config: {
      timeboxSeconds: 30,
      taskConfigs: [{ type: TaskType.Multiplication }],
    }
  },
  {
    title: "Practice addition for 3 minutes",
    config: {
      timeboxSeconds: 180,
      taskConfigs: [{ type: TaskType.Addition }],
    }
  },
  {
    title: "Practice multiplication for 3 minutes",
    config: {
      timeboxSeconds: 180,
      taskConfigs: [{ type: TaskType.Multiplication }],
    }
  },
] 

const Catalog: FC<Props> = function ({className}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOptionClick = (option: CatalogOption) => {
    dispatch(select(option))
    router.push('/practice')
  }

  return (<div className={className}>
      {options.map((o, key) => (
        <div key={key} className="option">
          <button onClick={() => handleOptionClick(o)}>
            {o.title}
          </button>
        </div>
      ))}
      <div className="option">
        <Link href="/practice">
          <a>Just go back to current practice</a>
        </Link>
      </div>
  </div>)
}

interface Props {
  className?: string
}

const StyledCatalog = styled(Catalog)`
  button {
    font-family: 'Dekko';
    font-size: 1.2em;
  }

  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: stretch;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: row;
  }
  .option {
    flex: 1 0;
    border: 0;
    display: flex;

    button {
      flex: 1 0 100%;
      width: 100%;
    }
  }
`

export default StyledCatalog
