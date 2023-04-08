import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  colorTheme: 'light',
  nav: false,
  sidebar: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.colorTheme = action.payload
    },
  },
})

export const { setTheme } = uiSlice.actions

export default uiSlice.reducer
