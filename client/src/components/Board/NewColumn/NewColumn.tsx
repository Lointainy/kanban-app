import { useState } from 'react'
import { useToggle } from '@/hooks/useToggle'

import style from './NewColumn.module.scss'

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { Input } from '@components'
import { useAddColumnMutation } from '@/store/reducers/boardsApi'
import { useParams } from 'react-router-dom'

export default function NewColumn() {
  const [columnName, setColumnName] = useState('')

  const { toggle, handleToggle, setToggle } = useToggle(false)

  const [addColumn] = useAddColumnMutation()

  const { boardId } = useParams()

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnName(e.target.value)
  }

  const handleCreateColumn = () => {
    setToggle(false)
    addColumn({ id: boardId, column: { name: columnName } })
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleCreateColumn()
  }

  return (
    <div className={`${style.create}`} onClick={handleToggle}>
      {toggle && (
        <div className={style.create__field} onClick={(e) => e.stopPropagation()}>
          <Input
            name={'create'}
            placeholder={'Enter the Column name'}
            required={true}
            className={'simple'}
            value={columnName}
            onChange={handleChangeName}
            onKeyDown={handleKeyDown}
          />
          <button className={style.btn__create} onClick={() => handleCreateColumn()}>
            <Icon icon="plus" />
            <span>create</span>
          </button>
          <button className={style.btn__cancel} onClick={handleToggle}>
            <span>Cancel</span>
          </button>
        </div>
      )}
      {!toggle && (
        <button className={`${style.btn}`}>
          <Icon icon="plus" />
          <span>Create New Column</span>
        </button>
      )}
    </div>
  )
}
