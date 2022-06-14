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
  baseQuery: fetchBaseQuery({ baseUrl: 'https://penguin.linux.test:3001/' }),
  endpoints: (builder) => ({
    getAllPreviousPractices: builder.query<PreviousPractice[], null>({
      query: () => 'history-data.json',
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints 
export const { useGetAllPreviousPracticesQuery } = archiveApi
