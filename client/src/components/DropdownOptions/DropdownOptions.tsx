import { useEffect, useRef } from 'react'

/* Hooks */
import { useToggle } from '@hooks/useToggle'

/* Styles */
import style from './DropdownOptions.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

type Props = {
  options: {
    label: string
    error?: boolean
    onClick: () => void
  }[]
  fieldStyle?: string
}

export default function DropdownOptions({ options, fieldStyle }: Props) {
  const { toggle, setToggle, handleToggle } = useToggle(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOption = (option) => {
    option.onClick()
    setToggle(false)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToggle(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className={`${style.option} ${style[fieldStyle]}`} ref={dropdownRef}>
      <button className={style.button} onClick={handleToggle}>
        <Icon icon="ellipsis-vertical" className={style.icon} />
      </button>
      {toggle && (
        <div className={style.dropdown} onClick={(e) => e.stopPropagation()}>
          <ul className={style.list}>
            {options.map((option, index) => (
              <li
                className={`${style.item} ${option.error && style.error}`}
                key={index}
                onClick={() => handleClickOption(option)}>
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
