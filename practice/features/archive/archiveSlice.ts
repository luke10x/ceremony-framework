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
import { useRtkQueryResource } from '../../app/useRktQueryResource'

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

export const usePreviousPractices = () => {
  return useRtkQueryResource<PreviousPractice[]>(archiveApi, "getAllPreviousPractices")
}
