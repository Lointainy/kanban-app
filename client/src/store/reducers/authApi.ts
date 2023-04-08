import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = import.meta.env.VITE_API_URL

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/user` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/login`,
        method: 'POST',
        body: body,
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: `/signup`,
        method: 'POST',
        body: body,
      }),
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = authApi
