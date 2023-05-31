import { useToggle } from '@hooks/useToggle'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/* Styles */
import style from './DropdownList.module.scss'

export default function DropdownList(props) {
  const { label, children } = props

  const { toggle: dropdown, handleToggle } = useToggle(false)

  return (
    <div className={style.dropdown_list}>
      <div onClick={handleToggle} className={style.select_container}>
        <span className={style.label}>{label}</span>
        {dropdown ? (
          <Icon icon="chevron-up" className={style.icon} />
        ) : (
          <Icon icon="chevron-down" className={style.icon} />
        )}
      </div>
      {dropdown && <div className={style.dropdown}>{children}</div>}
    </div>
  )
}
