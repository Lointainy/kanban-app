/* Router */
import { NavLink, useLocation } from 'react-router-dom'

/* Store */
import { useAppDispatch, useAppSelector } from '@hooks/useRedux'
import { logout } from '@store/reducers/authSlice'
import { openModal } from '@store/reducers/modalSlice'

/* Styles */
import style from './Header.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/* Components */
import { DropdownOptions } from '@components'

/* Logo */
import darkLogo from '@/assets/images/logo/dark-theme-logo.svg'
import lightLogo from '@/assets/images/logo/light-theme-logo.svg'

const Header: React.FC = () => {
  const dispatch = useAppDispatch()

  // Get theme name from store
  const theme = useAppSelector((store) => store.ui.colorTheme)

  // Get name active board from store
  const board = useAppSelector((store) => store.boards.activeBoard)

  // Location path
  const { pathname } = useLocation()

  const defaultOptions = [{ label: 'Add Board', error: false, onClick: () => handleClickOption('AddNewBoard') }]

  const options = [...defaultOptions]

  if (pathname.includes('/board/')) {
    options.push(
      {
        label: 'Edit board',
        error: false,
        onClick: () => handleClickOption('EditBoard'),
      },
      {
        label: 'Delete board',
        error: true,
        onClick: () => handleClickOption('DeleteBoard'),
      }
    )
  }

  options.push({ label: 'Logout', error: true, onClick: () => handleClickOption('Logout') })

  const handleClickOption = (name: string) => {
    switch (name) {
      case 'AddNewTask':
        dispatch(openModal({ name: 'AddNewTask' }))
        break
      case 'AddNewBoard':
        dispatch(openModal({ name: 'AddNewBoard' }))
        break
      case 'EditBoard':
        dispatch(openModal({ name: 'EditBoard' }))
        break
      case 'DeleteBoard':
        dispatch(openModal({ name: 'DeleteBoard' }))
        break
      case 'Logout':
        dispatch(logout())
        break
    }
  }

  return (
    <div className={style.header}>
      <div className={style.logo}>
        <NavLink to={'/'}>
          {theme == 'dark-theme' && <img src={`${darkLogo}`} alt="logo" />}
          {theme == 'light-theme' && <img src={`${lightLogo}`} alt="logo" />}
        </NavLink>
      </div>

      <h1 className={style.title}>{pathname.includes('/board/') && board.name}</h1>

      <button className={style.btn} onClick={() => handleClickOption('AddNewTask')}>
        <Icon icon="plus" />
        <span>Add new task</span>
      </button>
      <DropdownOptions options={options} fieldStyle="invert" />
    </div>
  )
}
export default Header
