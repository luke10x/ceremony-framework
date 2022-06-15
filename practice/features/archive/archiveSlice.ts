export interface PreviousPractice {
  practiceType: "string",
  durationInMs: number,
  mistakes: number,
  solutions: number,
  points: number,
}

export interface ArchiveState {
  previousPractices: PreviousPractice[]
};

const initialState: ArchiveState = {
  previousPractices: []
}

export interface WrappedData {
  data: PreviousPractice[]
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const archiveApi = createApi({
  reducerPath: 'archiveApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://math4kids-beta.vercel.app/' }),
  endpoints: (builder) => ({
    getAllPreviousPractices: builder.query<PreviousPractice[], null>({
      query: () => 'history-data.json',
    }),
  }),
})

export const useRtkQueryResource = () => {
  const useGetAllPreviousPracticesPromise = (args: null) => archiveApi
    .util
    .getRunningOperationPromise("getAllPreviousPractices", null) as PromiseLike<WrappedData>|undefined

  const { useGetAllPreviousPracticesQuery } = archiveApi
  
  const { data } = useGetAllPreviousPracticesQuery(null)

  let promise = useGetAllPreviousPracticesPromise(null)

  if (promise === undefined) {
    promise = new Promise(
      (resolve, reject)=> {
        if (data !== undefined) {
          resolve({ data })
        } else {
          reject("Cannot get RTK Query promise and there is no data loaded yet")
        }
      }
    )
  }
  
  const wrapPromise = <T extends unknown>(promise: PromiseLike<T>) => {
    let status = 'pending'
    let response: T
  
    const suspender = promise.then(
      (res: T) => {
        status = 'success'
        response = res
      },
      (err) => {
        status = 'error'
        response = err
      },
    )
  
    const read = () => {
      switch (status) {
        case 'pending':
          throw suspender
        case 'error':
          throw response
        default:
          return response
      }
    }
  
    return { read }
  }

  return wrapPromise<WrappedData>(promise)
}
  