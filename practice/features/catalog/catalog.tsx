import React, { FC } from "react";
import { TaskType } from "../practice/types";
import styled from "styled-components";
import { useRouter } from "next/router";
import { CatalogOption, select } from "./catalogSlice";
import { useAppDispatch } from "../../app/hooks";
import Link from "next/link";

const options: CatalogOption[] = [
  {
    title: "Practice addition for 20 seconds",
    config: {
      timeboxSeconds: 20,
      taskConfigs: [{ type: TaskType.Addition }],
    }
  },
  {
    title: "Practice multiplication for 20 seconds",
    config: {
      timeboxSeconds: 20,
      taskConfigs: [{ type: TaskType.Multiplication }],
    }
  },
  {
    title: "Practice addition for 100 seconds",
    config: {
      timeboxSeconds: 100,
      taskConfigs: [{ type: TaskType.Addition }],
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
  .option {
    border: 1px solid blue;
    margin: 10px;
  }
`

export default StyledCatalog
