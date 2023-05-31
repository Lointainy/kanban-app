import { useEffect, useRef, useState } from 'react'

/* Hooks */
import { useToggle } from '@hooks/useToggle'

/* Styles */
import style from './CreateItemField.module.scss'

/* Components */
import { Input } from '@components'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

type Props = {
  title: string
  buttons?: boolean
  dropdown?: boolean
  createItem: (value: string) => void
}

export default function CreateItemField(props: Props) {
  const { title, createItem, buttons, dropdown } = props

  const formRef = useRef<HTMLFormElement>(null)

  const [value, setValue] = useState('')

  const { toggle, handleToggle, setToggle } = useToggle(false)

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  function handleCreate() {
    if (value.length > 2) {
      setToggle(false)
      createItem(value)
      setValue('')
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (formRef.current) {
        handleCreate()
      }
    }
  }

  const handleOpen = () => {
    handleToggle()
  }

  const handleClose = () => {
    setToggle(false)
    setValue('')
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className={`${style.create} ${dropdown ? style.dropdown : ''}`} onClick={handleOpen} ref={formRef}>
      {!toggle && !dropdown && (
        <button className={`${style.btn}`}>
          <Icon icon="plus" />
          <span>{`Create New ${title}`}</span>
        </button>
      )}
      {dropdown && <button className={`${style.btn}`}>{toggle ? <Icon icon="minus" /> : <Icon icon="plus" />}</button>}
      {toggle && (
        <div className={`${style.create__field} ${buttons && style.full}`} onClick={(e) => e.stopPropagation()}>
          <div className={style.input__area}>
            <Input
              autoFocus={true}
              name={'create'}
              placeholder={`Enter ${title} name`}
              required={true}
              className={'simple'}
              value={value}
              pattern={'^[a-zA-Z0-9]+([- ]?[a-zA-Z0-9]+){2,19}$'}
              onChange={handleChangeValue}
              onKeyDown={handleKeyDown}
            />
          </div>
          {buttons && (
            <div className={style.buttons}>
              <button className={style.btn__create} onClick={handleCreate}>
                <Icon icon="plus" />
                <span>create</span>
              </button>
              <button className={style.btn__cancel} onClick={handleClose}>
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
