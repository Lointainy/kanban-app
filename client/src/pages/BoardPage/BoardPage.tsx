/* Route */
import { useParams } from 'react-router-dom'

/* Store */
import { useAddColumnMutation, useGetSingleBoardQuery } from '@store/reducers/boardsApi'

/* Style */
import style from './BoardPage.module.scss'

/* Components */
import { Column, CreateItemForm } from '@components/Board'
import { useEffect } from 'react'
import { useAppDispatch } from '@/hooks/useRedux'
import { setActiveBoard } from '@/store/reducers/boardSlice'

const BoardPage: React.FC = () => {
  const dispatch = useAppDispatch()

  // Get page params (board id)
  const { boardId } = useParams()

  const [addColumn] = useAddColumnMutation()
  const board = useGetSingleBoardQuery(boardId)

  const handleCreate = (value: string) => {
    addColumn({ id: boardId, column: { name: value } })
  }

  useEffect(() => {
    if (board.isSuccess) {
      dispatch(setActiveBoard(board.data))
    }
  }, [board.isSuccess, boardId])

  return (
    <div className={style.page}>
      <div className={style.columns}>
        {board.isSuccess &&
          board.data?.columns?.map((column) => {
            return <Column column={column} key={column._id} />
          })}
        <div className={style.add}>
          <CreateItemForm title={'column'} createItem={handleCreate} />
        </div>
      </div>
    </div>
  )
}
export default BoardPage
