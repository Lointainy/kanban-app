import { createSlice } from '@reduxjs/toolkit'
import { stat } from 'fs'

type state = {
  token: string | null
  login: boolean
  userData: {}
}

const initialState: state = {
  token: null,
  login: false,
  userData: {},
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token
      state.login = true
      action.payload.rememberUser && localStorage.setItem('token', action.payload.token)
    },
    getToken: (state) => {
      const token = localStorage.getItem('token')
      if (token) {
        state.token = token
        state.login = true
      }
    },
    logout: (state) => {
      localStorage.removeItem('token')
      state.token = null
      state.login = false
    },
  },
})

export const { setToken, getToken, logout } = authSlice.actions
export default authSlice.reducer
