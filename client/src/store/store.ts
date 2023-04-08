import { configureStore } from '@reduxjs/toolkit'

/* Reducers */
import uiReducer from './reducers/uiSlice'
import authReducer from './reducers/authSlice'
import { authApi } from './reducers/authApi'
import { boardsApi } from './reducers/boardsApi'
import boardsReducer from './reducers/boardSlice'
import modalReducer from './reducers/modalSlice'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
    ui: uiReducer,
    auth: authReducer,
    boards: boardsReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware, boardsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
