import { useEffect } from 'react'

/* Route */
import { useParams } from 'react-router-dom'

/* Store */
import { useAppDispatch, useAppSelector } from '@hooks/useRedux'
import { setActiveBoard } from '@store/reducers/boardSlice'
import { useGetSingleBoardQuery, useUpdateBoardMutation } from '@store/reducers/boardsApi'

/* Style */
import style from './BoardPage.module.scss'

/* Components */
import { Column, NewColumn } from '@components/Board'

const BoardPage: React.FC = () => {
  const dispatch = useAppDispatch()

  // Get page params (board id)
  const { boardId } = useParams()

  const { activeBoard, boards } = useAppSelector((store) => store.boards)

  const userLogined = useAppSelector((store) => store.auth.login)

  const board = useGetSingleBoardQuery(boardId)

  // Patch request, update boards data from API
  const [updateBoard] = useUpdateBoardMutation()

  useEffect(() => {
    if (userLogined) {
      board.refetch().then(() => {
        if (board.isSuccess) {
          dispatch(setActiveBoard(board.data))
        }
      })
    }
  }, [userLogined, board.isLoading, board.data])

  // check change and update API
  useEffect(() => {
    if (activeBoard.name) {
      // check change and update API
      updateBoard({ id: boardId, board: activeBoard })
    }
  }, [activeBoard])

  return (
    <div className={style.page}>
      <div className={style.columns}>
        {activeBoard?.columns?.map((column) => {
          return <Column column={column} key={column._id} />
        })}
        <NewColumn />
      </div>
    </div>
  )
}
export default BoardPage
