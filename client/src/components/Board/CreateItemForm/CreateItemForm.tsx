import { useRef, useState } from 'react'

/* Hooks */
import { useToggle } from '@hooks/useToggle'

/* Styles */
import style from './CreateItemForm.module.scss'

/* Components */
import { Input } from '@components'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

type Props = {
  title: string
  buttons?: boolean
  createItem: (value: string) => void
}

export default function CreateItemForm(props: Props) {
  const { title, createItem, buttons } = props

  const formRef = useRef<HTMLFormElement>(null)

  const [value, setValue] = useState('')

  const { toggle, handleToggle, setToggle } = useToggle(false)

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  function handleCreate(e) {
    e.preventDefault()
    setToggle(false)
    createItem(value)
    setValue('')
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (formRef.current) {
        formRef.current.requestSubmit()
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

  return (
    <form className={`${style.create}`} onClick={handleOpen} onSubmit={handleCreate} ref={formRef}>
      {toggle && (
        <div className={`${style.create__field} ${buttons && style.full}`} onClick={(e) => e.stopPropagation()}>
          <Input
            name={'create'}
            placeholder={`Enter ${title} name`}
            required={true}
            className={'simple'}
            value={value}
            pattern={'^[a-zA-Z0-9 !.,-+=]{3,20}$'}
            onChange={handleChangeValue}
            onKeyDown={handleKeyDown}
          />
          {buttons && (
            <>
              <button className={style.btn__create} type="submit">
                <Icon icon="plus" />
                <span>create</span>
              </button>
              <button className={style.btn__cancel} onClick={handleClose}>
                <span>Cancel</span>
              </button>
            </>
          )}
        </div>
      )}
      {!toggle && (
        <button className={`${style.btn}`}>
          <Icon icon="plus" />
          <span>{`Create New ${title}`}</span>
        </button>
      )}
    </form>
  )
}
