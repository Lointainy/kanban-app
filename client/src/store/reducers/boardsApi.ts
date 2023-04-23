import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

const API_URL = import.meta.env.VITE_API_URL

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/boards/`,
    prepareHeaders: (headers, { getState }) => {
      const { auth } = getState() as RootState
      if (auth.token) {
        headers.set('Authorization', `Bearer ${auth.token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => '/',
    }),
    getSingleBoard: builder.query({
      query: (id) => `/${id}`,
    }),
    addBoard: builder.mutation({
      query: (board) => ({
        url: '/',
        method: 'POST',
        body: board,
      }),
    }),
    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
    updateBoard: builder.mutation({
      query: ({ id, board }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: board,
      }),
    }),
  }),
})

export const {
  useGetBoardsQuery,
  useGetSingleBoardQuery,
  useAddBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} = boardsApi
