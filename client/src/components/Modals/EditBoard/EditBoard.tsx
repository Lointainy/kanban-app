import { useState } from 'react'

/* Styles */
import style from './EditBoard.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/* Components */
import { CreateItemField } from '@/components/Board'
import { useUpdateBoardMutation } from '@/store/reducers/boardsApi'
import { Input } from '@components'

const EditBoard: React.FC = (props) => {
  const { closeModal } = props

  const [board, setBoard] = useState(props.board)

  const [updateBoard] = useUpdateBoardMutation()

  /* OnChange Inputs */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBoard({ ...board, [name]: value })
  }

  /* OnChange Column input */
  const handleChangeColumn = (e, index) => {
    const { value } = e.target
    const updatedColumns = board.columns.map((column, columnIndex) => {
      if (columnIndex === index) {
        return {
          ...column,
          name: value,
        }
      }
      return column
    })
    setBoard({ ...board, columns: updatedColumns })
  }

  /* Create column */
  const handleCreateColumn = (value: string) => {
    const updatedColumns = [...board.columns]
    updatedColumns.push({ name: value })
    setBoard({ ...board, columns: updatedColumns })
  }

  /* Remove columns */
  const handleRemoveColumn = (index: number) => {
    const updatedColumns = board.columns.filter((_, columnIndex) => columnIndex !== index)
    setBoard({ ...board, columns: updatedColumns })
  }

  /* Submit form, updated board */
  const handleSubmit = (e) => {
    e.preventDefault()
    updateBoard({ id: board._id, board: board })
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h2 className={style.title}>Edit Board</h2>
      <Input name={'name'} value={board.name} label={'Name'} onChange={handleChange} />
      <div className={style.columns}>
        <h4 className={style.label}>Columns</h4>
        <ul className={style.list}>
          {board?.columns.map((column, index) => {
            return (
              <li className={style.item} key={index}>
                <Input name={column.name} value={column.name} onChange={(e) => handleChangeColumn(e, index)} />
                <Icon icon="trash" className={style.item__icon} onClick={() => handleRemoveColumn(index)} />
              </li>
            )
          })}
        </ul>
        <CreateItemField title={'column'} createItem={handleCreateColumn} />
      </div>
      <button className={style.btn__save} type="submit">
        Save Changes
      </button>
    </form>
  )
}
export default EditBoard
