/* Styles */
import style from './AddNewBoard.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/* Components */
import { useAddBoardMutation } from '@/store/reducers/boardsApi'
import { Input } from '@components'
import { CreateItemField } from '@components/Board'
import { useState } from 'react'

const AddNewBoard: React.FC = ({ closeModal }) => {
  const [board, setBoard] = useState({
    name: '',
    columns: [],
  })

  const [addBoard] = useAddBoardMutation()

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

  /* Submit form, create board */
  const handleSubmit = (e) => {
    e.preventDefault()
    addBoard(board)
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h2 className={style.title}>Add new Board</h2>
      <Input
        value={board.name}
        name={'name'}
        placeholder={'Alexei Ward'}
        errorMessage={'wrong format'}
        required={true}
        pattern={'^[A-Za-z]{3,24}$'}
        label={'Name'}
        onChange={handleChange}
      />
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
      <button className={style.btn__add} type="submit">
        Create New Board
      </button>
    </form>
  )
}
export default AddNewBoard
