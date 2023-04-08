import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:3500/api/user'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}` }),
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
