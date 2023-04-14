/* Router */
import { NavLink, useLocation } from 'react-router-dom'

/* Store */
import { useAppDispatch, useAppSelector } from '@hooks/useRedux'

/* Styles */
import style from './Header.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/* Logo */
import darkLogo from '@/assets/images/logo/dark-theme-logo.svg'
import lightLogo from '@/assets/images/logo/light-theme-logo.svg'
import { openModal } from '@/store/reducers/modalSlice'

const Header: React.FC = () => {
  const dispatch = useAppDispatch()

  // Get theme name from store
  const theme = useAppSelector((store) => store.ui.colorTheme)

  // Get name active board from store
  const { name: boardTitle } = useAppSelector((store) => store.boards.activeBoard)

  // Location path
  const { pathname } = useLocation()

  return (
    <div className={style.header}>
      <div className={style.logo}>
        <NavLink to={'/'}>
          {theme == 'dark-theme' && <img src={`${darkLogo}`} alt="logo" />}
          {theme == 'light-theme' && <img src={`${lightLogo}`} alt="logo" />}
        </NavLink>
      </div>

      <h1 className={style.title}>{pathname.includes('/board/') && boardTitle}</h1>

      <button className={style.btn} onClick={() => dispatch(openModal({ name: 'AddNewTask' }))}>
        <Icon icon="plus" />
        <span>Add new task</span>
      </button>
      <div className={style.option}>
        <div className={style.option__btn}>
          <Icon icon="ellipsis-vertical" />
        </div>
      </div>
    </div>
  )
}
export default Header
