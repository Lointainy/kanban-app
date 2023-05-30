/* Route */
import { useParams } from 'react-router-dom'

/* Store */
import { useAddColumnMutation, useGetSingleBoardQuery, useUpdateBoardMutation } from '@store/reducers/boardsApi'

/* Style */
import style from './BoardPage.module.scss'

/* Components */
import { useAppDispatch } from '@/hooks/useRedux'
import { setActiveBoard } from '@/store/reducers/boardSlice'
import { Column, CreateItemField } from '@components/Board'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const BoardPage: React.FC = () => {
  const dispatch = useAppDispatch()

  // Get page params (board id)
  const { boardId } = useParams()

  // Get board from Api
  const boardFromApi = useGetSingleBoardQuery(boardId)
  const [board, setBoard] = useState(boardFromApi.data)

  // Mutation
  const [addColumn] = useAddColumnMutation()
  const [updateBoard] = useUpdateBoardMutation()

  const handleCreate = (value: string) => {
    addColumn({ id: boardId, column: { name: value } })
  }

  useEffect(() => {
    if (boardFromApi.isSuccess) {
      dispatch(setActiveBoard(boardFromApi.data))
    }
    if (boardFromApi.data) {
      setBoard(boardFromApi.data)
    }
  }, [boardFromApi.isSuccess, boardFromApi.data, boardId])

  const onDragEnd = (result) => {
    const { source, destination } = result

    // If the task is dropped outside of a droppable area, we can ignore it
    if (!destination) {
      return
    }

    // Clone the board object
    const updatedBoard = { ...board }

    // Find the source and destination columns
    const sourceColumn = updatedBoard.columns.find((column) => column._id === source.droppableId)
    const destinationColumn = updatedBoard.columns.find((column) => column._id === destination.droppableId)

    // Move the task within the same column
    if (sourceColumn === destinationColumn) {
      const updatedTasks = Array.from(sourceColumn.tasks)
      const [movedTask] = updatedTasks.splice(source.index, 1)
      updatedTasks.splice(destination.index, 0, movedTask)

      updatedBoard.columns = updatedBoard.columns.map((column) => {
        if (column._id === source.droppableId) {
          return {
            ...column,
            tasks: updatedTasks,
          }
        }
        return column
      })
    } else {
      // Move the task to a different column
      const updatedSourceTasks = Array.from(sourceColumn.tasks)
      const [movedTask] = updatedSourceTasks.splice(source.index, 1)

      const updatedDestinationTasks = Array.from(destinationColumn.tasks)
      updatedDestinationTasks.splice(destination.index, 0, movedTask)

      updatedBoard.columns = updatedBoard.columns.map((column) => {
        if (column._id === source.droppableId) {
          return {
            ...column,
            tasks: updatedSourceTasks,
          }
        }
        if (column._id === destination.droppableId) {
          return {
            ...column,
            tasks: updatedDestinationTasks,
          }
        }
        return column
      })
    }

    // Update the state with the new board object
    setBoard(updatedBoard)
  }

  useEffect(() => {
    if (board) {
      updateBoard({ id: board._id, board: board })
    }
  }, [board])

  return (
    <div className={style.page}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={style.columns}>
          {boardFromApi.isSuccess &&
            board?.columns?.map((column) => {
              return (
                <Droppable key={column._id} droppableId={column._id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={snapshot.isDraggingOver ? style.drop : ''}
                      {...provided.droppableProps}>
                      <Column column={column} key={column._id} />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )
            })}
          <div className={style.add}>
            <CreateItemField title={'column'} createItem={handleCreate} />
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}
export default BoardPage
