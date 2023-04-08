import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: false,
  name: '',
  data: {},
  id: '',
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.status = true
      state.name = action.payload.name
      state.data = action.payload.data
    },
    closeModal: (state) => {
      state.status = false
      state.name = ''
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer
