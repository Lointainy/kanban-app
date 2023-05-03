/* Store */
import { toggleSidebar } from '@/store/reducers/uiSlice'
import { useAppDispatch } from '@/hooks/useRedux'

/* Styles */
import style from './ToggleSidebar.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export default function ToggleSidebar() {
  const dispatch = useAppDispatch()
  return (
    <div className={style.bar} onClick={() => dispatch(toggleSidebar())}>
      <Icon icon="bars" />
    </div>
  )
}
