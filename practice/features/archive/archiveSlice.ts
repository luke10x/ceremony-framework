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

export const useGetPreviousPracticesSuspenseQuery = () => {
  const queryActionCreatorResult = archiveApi.endpoints.getAllPreviousPractices.useQuery(null)
  if (queryActionCreatorResult.isLoading) {
    const promise = archiveApi.util.getRunningOperationPromise('getAllPreviousPractices', null)
    if (promise !== undefined) {
      throw promise
    }
  }
  return queryActionCreatorResult 
}
