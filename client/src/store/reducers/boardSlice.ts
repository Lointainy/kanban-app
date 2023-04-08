import { stat } from 'fs'
import { createSlice } from '@reduxjs/toolkit'
import { STATES } from 'mongoose'

const initialState = {
  boards: [],
  activeBoard: {},
  isLoading: true,
}

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.boards = action.payload
      state.isLoading = false
      console.log(JSON.stringify(state.boards))
    },

    setActiveBoard: (state, action) => {
      let id = action.payload

      state.activeBoard = state.boards.filter((board) => board._id == id)[0]
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload

      const updatedColumns = state.activeBoard.columns.map((column) => {
        return {
          ...column,
          tasks: column.tasks.map((task) => {
            if (task._id === updatedTask._id) {
              return updatedTask
            } else {
              return task
            }
          }),
        }
      })

      state.activeBoard = { ...state.activeBoard, columns: updatedColumns }
    },
    moveTask: (state, action) => {
      let taskId = action.payload.taskId

      let parentColumnId = action.payload.parentColumnId
      let newParentColumnId = action.payload.newParentColumnId

      let newTaskId = action.payload.newTaskId

      let task = state.activeBoard.columns
        .filter((column) => column._id === parentColumnId)[0]
        .tasks.filter((task) => task._id === taskId)[0]

      let updatedColumns = {}

      if (parentColumnId === newParentColumnId) {
        updatedColumns = state.activeBoard.columns.map((column) => {
          if (column._id === parentColumnId) {
            let tasks = column.tasks
            let newTaskIndex = tasks.findIndex((task) => task._id === newTaskId)
            let newTasks = tasks.filter((task) => task._id != taskId)
            newTasks.splice(newTaskIndex, 0, task)
            return { ...column, tasks: newTasks }
          } else {
            return column
          }
        })
      }

      if (parentColumnId !== newParentColumnId) {
        updatedColumns = state.activeBoard.columns.map((column) => {
          if (column._id === parentColumnId) {
            return { ...column, tasks: column.tasks.filter((task) => task._id !== taskId) }
          } else if (column._id === newParentColumnId) {
            return { ...column, tasks: column.tasks.concat(task) }
          } else {
            return column
          }
        })
      }

      state.activeBoard = { ...state.activeBoard, columns: updatedColumns }
    },
  },
})

export const { setBoards, setActiveBoard, updateTask, moveTask } = boardsSlice.actions

export default boardsSlice.reducer
