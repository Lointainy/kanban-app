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
        headers.set('Authorization', `Bearer ${auth.token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    getBoards: builder.query({
      query: () => '/boards',
      providesTags: ['Boards'],
    }),

    getSingleBoard: builder.query({
      query: (id) => `/boards/${id}`,
      providesTags: ['Board'],
    }),

    addBoard: builder.mutation({
      query: (board) => ({
        url: '/boards',
        method: 'POST',
        body: board,
      }),
      invalidatesTags: ['Boards'],
    }),

    deleteBoard: builder.mutation({
      query: (id) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),

    updateBoard: builder.mutation({
      query: ({ id, board }) => ({
        url: `/boards/${id}`,
        method: 'PATCH',
        body: board,
      }),
    }),

    // Column
    addColumn: builder.mutation({
      query: ({ id, column }) => ({
        url: `/columns?boardId=${id}`,
        method: 'POST',
        body: column,
      }),
      invalidatesTags: ['Board'],
    }),
    deleteColumn: builder.mutation({
      query: ({ boardId, columnId }) => ({
        url: `/columns?boardId=${boardId}&columnId=${columnId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),

    // Task
    addTask: builder.mutation({
      query: ({ boardId, columnId, task }) => ({
        url: `/tasks?boardId=${boardId}&columnId=${columnId}`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Board'],
    }),
    deleteTask: builder.mutation({
      query: ({ boardId, columnId, taskId }) => ({
        url: `/tasks?boardId=${boardId}&columnId=${columnId}&taskId=${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Board'],
    }),
  }),
})

export const {
  useGetBoardsQuery,
  useGetSingleBoardQuery,
  useAddBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardMutation,
  // Column
  useAddColumnMutation,
  useDeleteColumnMutation,
  // Taks
  useAddTaskMutation,
  useDeleteTaskMutation,
} = boardsApi
