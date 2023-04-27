import { useEffect, useState } from 'react'

/* Store */
import { useAddBoardMutation } from '@store/reducers/boardsApi'

/* Routes */
import { NavLink } from 'react-router-dom'

/* Styles */
import style from './Sidebar.module.scss'

/* Components */
import { ThemeSwitcher } from '@components'
import { CreateItemForm } from '@components/Board'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { useAppSelector } from '@/hooks/useRedux'

const Sidebar: React.FC = ({ boards }) => {
  const { _id: boardId } = useAppSelector((store) => store.boards.activeBoard)

  const [activeId, setActiveId] = useState('')

  const boardsLength = boards.data ? boards.data.length : 0

  const addBoard = useAddBoardMutation()

  const handleCreateBoard = (boardName: string) => {
    addBoard[0]({ name: boardName })
  }

  const handleClickBoard = (board) => {
    setActiveId(board._id)
  }

  useEffect(() => {
    if (boardId) {
      setActiveId(boardId)
    }
  }, [boardId])

  return (
    <div className={style.sidebar}>
      <div className={style.boards}>
        <span className={style.title}>all boards {`(${boardsLength})`}</span>
        <ul className={style.links}>
          {boards.isSuccess &&
            boards?.data.map((board) => {
              return (
                <li
                  key={board._id}
                  className={`${style.item} ${activeId == board._id && style.active}`}
                  onClick={() => handleClickBoard(board)}>
                  <NavLink to={`board/${board._id}`} className={style.link}>
                    <Icon icon="layer-group" className={style.icon} />
                    <span className={style.name}>{board.name}</span>
                  </NavLink>
                </li>
              )
            })}
          {boards.isLoading && (
            <>
              <li className={`${style.item} ${style.skelet}`}>
                <div className={style.link}>
                  <div className={style.icon}></div>
                  <span className={style.name}></span>
                </div>
              </li>
            </>
          )}
        </ul>
        <CreateItemForm title={'board'} buttons={true} createItem={handleCreateBoard} />
      </div>
      <ThemeSwitcher />
    </div>
  )
}
export default Sidebar
