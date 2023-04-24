import { useEffect, useState } from 'react'

/* Store */
import { useAppSelector } from '@hooks/useRedux'
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

const Sidebar: React.FC = () => {
  const { boards, activeBoard } = useAppSelector((store) => store.boards)

  const [activeId, setActiveId] = useState('')

  const boardsLength = boards ? boards.length : 0

  const [addBoard, { isLoading, isSuccess }] = useAddBoardMutation()

  const handleCreateBoard = (boardName: string) => {
    addBoard({ name: boardName })
  }

  useEffect(() => {
    setActiveId(activeBoard._id)
  }, [activeBoard])

  return (
    <div className={style.sidebar}>
      <div className={style.boards}>
        <span className={style.title}>all boards {`(${boardsLength})`}</span>
        <ul className={style.links}>
          {boards.map((board) => {
            return (
              <li key={board._id} className={`${style.item} ${board._id === activeId ? style.active : ''} `}>
                <NavLink to={`board/${board._id}`} className={style.link}>
                  <Icon icon="layer-group" className={style.icon} />
                  <span className={style.name}>{board.name}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
        <CreateItemForm title={'board'} buttons={true} createItem={handleCreateBoard} />
      </div>
      <ThemeSwitcher />
    </div>
  )
}
export default Sidebar
