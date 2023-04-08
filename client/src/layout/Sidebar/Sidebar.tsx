/* Store */
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'

/* Routes */
import { NavLink } from 'react-router-dom'

/* Styles */
import style from './Sidebar.module.scss'

/* Components */
import { ThemeSwitcher } from '@components'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { openModal } from '@/store/reducers/modalSlice'

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch()

  const { boards, activeBoard } = useAppSelector((store) => store.boards)

  const boardsLength = boards ? boards.length : 0

  const activeItem = (id: string) => {
    if (activeBoard._id === id) {
      return style.active
    } else {
      return ''
    }
  }

  return (
    <div className={style.sidebar}>
      <div className={style.boards}>
        <span className={style.title}>all boards {`(${boardsLength})`}</span>
        <ul className={style.links}>
          {boards.map((board) => {
            return (
              <li key={board._id} className={`${style.item} ${activeItem(board._id)} `}>
                <NavLink to={`board/${board._id}`} className={style.link}>
                  <Icon icon="layer-group" className={style.icon} />
                  <span className={style.name}>{board.name}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
        <button className={style.btn} onClick={() => dispatch(openModal({ name: 'AddNewBoard' }))}>
          + Create New Board
        </button>
      </div>

      <ThemeSwitcher />
    </div>
  )
}
export default Sidebar
