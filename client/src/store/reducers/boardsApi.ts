import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

const API_URL = 'http://localhost:3500/api/boards'

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState() as RootState
      if (auth.token) {
        headers.set(`Authorization`, `Bearer ${auth.token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    updateBoard: builder.mutation({
      query: ({ id, board }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: board,
      }),
    }),
    getBoards: builder.query({
      query: () => `/`,
    }),
  }),
})

export const { useGetBoardsQuery, useUpdateBoardMutation } = boardsApi
