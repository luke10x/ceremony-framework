import { createAction } from "@reduxjs/toolkit"

export const increment = createAction('enterprizeCounter/increment')
export const decrement = createAction('enterprizeCounter/decrement')
export const incrementByAmount = createAction<number>('enterprizeCounter/incrementByAmount')