import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: false,
  name: '',
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.status = true
      state.name = action.payload.name
    },
    closeModal: (state) => {
      state.status = false
      state.name = ''
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
