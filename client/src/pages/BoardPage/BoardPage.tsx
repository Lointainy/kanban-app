import { useEffect } from 'react'

/* Route */
import { useParams } from 'react-router-dom'

/* Store */
import { useAppDispatch, useAppSelector } from '@hooks/useRedux'
import { setActiveBoard } from '@store/reducers/boardSlice'
import { useUpdateBoardMutation } from '@store/reducers/boardsApi'

/* Style */
import style from './BoardPage.module.scss'

/* Components */
import { Column } from '@components/Board'

const BoardPage: React.FC = () => {
  const dispatch = useAppDispatch()

  // Get page params (board id)
  const { boardId } = useParams()

  // Get loading status and data from active board
  const { isLoading, activeBoard: board } = useAppSelector((store) => store.boards)

  // Patch request, update boards data from API
  const [updateBoard] = useUpdateBoardMutation()

  useEffect(() => {
    // Is loading set active board to store
    if (isLoading === false) {
      dispatch(setActiveBoard(boardId))
    }
  }, [isLoading, boardId])

  // check change and update API
  useEffect(() => {
    if (board.name) {
      // check change and update API
      updateBoard({ id: boardId, board })
    }
  }, [board])

  return (
    <div className={style.page}>
      <div className={style.columns}>
        {board.columns?.map((column) => {
          return <Column column={column} key={column._id} />
        })}
        <button>add new column</button>
      </div>
    </div>
  )
}
export default BoardPage
