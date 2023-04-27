import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  boards: [],
  activeBoard: {},
  activeColumn: {},
  activeTask: {},
  isLoading: true,
}

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setActiveColumn: (state, action) => {
      const column = action.payload
      state.activeColumn = column
    },

    setActiveTask: (state, action) => {
      const task = action.payload
      state.activeTask = task
    },

    setActiveBoard: (state, action) => {
      const board = action.payload
      state.activeBoard = board
    },
    moveTask: (state, action) => {
      const taskId = action.payload.taskId

      const parentColumnId = action.payload.parentColumnId
      const newParentColumnId = action.payload.newParentColumnId

      const newTaskId = action.payload.newTaskId

      const task = state.activeBoard.columns
        .filter((column) => column._id === parentColumnId)[0]
        .tasks.filter((task) => task._id === taskId)[0]

      let updatedColumns = {}

      if (parentColumnId === newParentColumnId) {
        updatedColumns = state.activeBoard.columns.map((column) => {
          if (column._id === parentColumnId) {
            const tasks = column.tasks
            const newTaskIndex = tasks.findIndex((task) => task._id === newTaskId)
            const newTasks = tasks.filter((task) => task._id != taskId)
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

export const { setActiveColumn, setActiveBoard, setActiveTask, moveTask } = boardsSlice.actions

export default boardsSlice.reducer
