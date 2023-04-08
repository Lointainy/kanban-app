import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

const API_URL = import.meta.env.VITE_API_URL

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
        url: `/boards/${id}`,
        method: 'PATCH',
        body: board,
      }),
    }),
    getBoards: builder.query({
      query: () => `/boards`,
    }),
  }),
})

export const { useGetBoardsQuery, useUpdateBoardMutation } = boardsApi
