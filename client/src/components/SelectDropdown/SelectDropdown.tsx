/* Style */
import { useToggle } from '@/hooks/useToggle'
import style from './SelectDropdown.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

interface Props {
  selected: string
  list: string[]
  label: string
  handleChange: (index: number) => void
}

export default function SelectDropdown(props: Props) {
  const { selected, list, handleChange, label } = props
  const [current, setCurrent] = useState(selected)

  const { toggle: dropdown, handleToggle: toggleDropdown, setToggle } = useToggle(false)

  const handleChangeSelected = (value: string, index: number) => {
    setCurrent(value)
    setToggle(false)
    handleChange(index)
  }

  return (
    <div className={style.select}>
      {label ? <h4 className={style.label}>{label}</h4> : ''}
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
                <li key={index} className={style.item} onClick={() => handleChangeSelected(item, index)}>
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
