import { TaskType, TypedTask } from "../types";
import {v4 as uuidv4} from 'uuid';

export const createMultiplicationTask = (): TypedTask<TaskType.Multiplication> => {
  const max = 9
  function getRandomInt(max: number) {
    return Math.ceil(Math.random() * max);
  }

  const a = getRandomInt(max + 1)
  const b = getRandomInt(max + 1)

  const correct = [a, b].reduce((a, b) => a * b)

  const factors = Array(10).fill(null).map((_, i) => i + 1)
  const products = factors.flatMap(
    multiplier => factors.map(multiplicand => multiplier * multiplicand)
  ).filter((v, i, a) => a.indexOf(v) === i);

  // console.log({factors, products})

  const hints = products
    // Take out the correct value
    .filter(x => x !== correct)

    // Shuffle all
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    // select 3 incorrect products
    .slice(0, 3)

    // also select the correct as the 4th value
    .concat([correct])

    // Shuffle 4 selected values again
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

    // create solutions from selected values
    .map(n => ({ product: n }))

  return {
    problem: {
      factors: [a, b],
    },
    taskId: uuidv4(),
    type: TaskType.Multiplication,
    hints,
  }
}
