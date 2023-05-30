/* Style */
import { useToggle } from '@/hooks/useToggle'
import style from './SelectDropdown.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

interface Props {
  selected: string
  list: string[]
  handleChange: (value: string) => void
}

export default function SelectDropdown(props: Props) {
  const { selected, list, handleChange } = props
  const [current, setCurrent] = useState(selected)

  const { toggle: dropdown, handleToggle: toggleDropdown, setToggle } = useToggle(false)

  const handleChangeSelected = (value: string) => {
    setCurrent(value)
    setToggle(false)
    handleChange(value)
  }

  return (
    <div className={style.select}>
      <div className={style.current} onClick={toggleDropdown}>
        <span className={style.title}>{current}</span>
        {dropdown ? (
          <Icon icon="chevron-up" className={style.icon} />
        ) : (
          <Icon icon="chevron-down" className={style.icon} />
        )}
      </div>
      {dropdown && (
        <div className={style.dropdown}>
          <ul className={style.list}>
            {list.map((item, index) => {
              return (
                <li key={index} className={style.item} onClick={() => handleChangeSelected(item)}>
                  {item}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
