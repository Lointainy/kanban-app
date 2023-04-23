import { useEffect, useRef } from 'react'
/* Router */
import { NavLink, useLocation } from 'react-router-dom'

/* Store */
import { useAppDispatch, useAppSelector } from '@hooks/useRedux'
import { logout } from '@store/reducers/authSlice'
import { openModal } from '@store/reducers/modalSlice'
import { resetBoards } from '@store/reducers/boardSlice'

/* Hooks */
import { useToggle } from '@hooks/useToggle'

/* Styles */
import style from './Header.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

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

  const { toggle: optionDropdown, handleToggle: optionDropdownToggle, setToggle: setOptionDropdown } = useToggle(false)

  const handleOption = (name: string) => {
    switch (name) {
      case 'AddNewTask':
        dispatch(openModal({ name: 'AddNewTask' }))
        break
      case 'EditBoard':
        dispatch(openModal({ name: 'EditBoard', data: board }))
        break
      case 'DeleteBoard':
        dispatch(openModal({ name: 'DeleteBoard', data: board }))
        break
    }

    return setOptionDropdown(false)
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(resetBoards())
    return setOptionDropdown(false)
  }

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOptionDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className={style.header}>
      <div className={style.logo}>
        <NavLink to={'/'}>
          {theme == 'dark-theme' && <img src={`${darkLogo}`} alt="logo" />}
          {theme == 'light-theme' && <img src={`${lightLogo}`} alt="logo" />}
        </NavLink>
      </div>

      <h1 className={style.title}>{pathname.includes('/board/') && board.name}</h1>

      <button className={style.btn} onClick={() => handleOption('AddNewTask')}>
        <Icon icon="plus" />
        <span>Add new task</span>
      </button>
      <div className={style.option} ref={dropdownRef}>
        <button className={style.button} onClick={optionDropdownToggle}>
          <Icon icon="ellipsis-vertical" className={style.icon} />
        </button>
        {optionDropdown && (
          <div className={style.option__dropdown} onClick={(e) => e.stopPropagation()}>
            <ul className={style.option__dropdown_list}>
              <li className={style.option__dropdown_item} onClick={() => handleOption('EditBoard')}>
                Edit Board
              </li>
              <li
                className={`${style.option__dropdown_item} ${style.error}`}
                onClick={() => handleOption('DeleteBoard')}>
                Delete Board
              </li>
              <li className={`${style.option__dropdown_item} ${style.error}`} onClick={() => handleLogout()}>
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
export default Header
