import { useEffect } from 'react'

/* Hooks */
import useTheme from '@hooks/useTheme'

/* Store */
import { useAppDispatch } from '@/hooks/useRedux'
import { setTheme } from '@/store/reducers/uiSlice'

/* Styles */
import style from './ThemeSwitcher.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

const ThemeSwitcher: React.FC = () => {
  const dispatch = useAppDispatch()

  // Use hooks for get, set, toggle theme
  const { theme, toggleTheme, userTheme } = useTheme()

  // Set theme name after change theme
  useEffect(() => {
    dispatch(setTheme(userTheme))
  }, [theme])

  return (
    <div className={style.theme}>
      <Icon icon="sun" className={`${style.icon} ${!theme && style.accent}`} />
      <label htmlFor="switcher" className={style.switch}>
        <input type="checkbox" id="switcher" checked={theme} onChange={toggleTheme} />
        <span className={style.slider}></span>
      </label>
      <Icon icon="moon" className={`${style.icon} ${theme && style.accent}`} />
    </div>
  )
}
export default ThemeSwitcher
