import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  colorTheme: 'light',
  sidebar: true,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.colorTheme = action.payload
    },
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar
    },
  },
})

export const { setTheme, toggleSidebar } = uiSlice.actions

export default uiSlice.reducer
