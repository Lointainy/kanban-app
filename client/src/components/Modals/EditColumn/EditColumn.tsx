import { useState } from 'react'

/* Styles */
import style from './EditColumn.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/* Store */
import { useUpdateColumnMutation } from '@store/reducers/boardsApi'

/* Components */
import { Input } from '@components'
import { CreateItemField } from '@components/Board'

export default function EditColumn(props) {
  const { id, closeModal } = props

  const [column, setColumn] = useState(props.column)

  const [updateColumn] = useUpdateColumnMutation()

  /* OnChange Inputs */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setColumn({ ...column, [name]: value })
  }

  /* OnChange Task input */
  const handleChangeTask = (e, index: number) => {
    const { value } = e.target
    const updatedTasks = column.tasks.map((task, taskIndex) => {
      if (taskIndex === index) {
        return {
          ...task,
          name: value,
        }
      }
      return task
    })
    setColumn({ ...column, tasks: updatedTasks })
  }

  /* Create task */
  const handleCreateTask = (value: string) => {
    const updatedTasks = [...column.tasks]
    updatedTasks.push({ title: value })
    setColumn({ ...column, tasks: updatedTasks })
  }

  /* Remove task */
  const handleRemoveTask = (index: number) => {
    const updatedTasks = column.tasks.filter((_, taskIndex) => taskIndex !== index)
    setColumn({ ...column, tasks: updatedTasks })
  }

  /* Submit form, updated column */
  const handleSubmit = (e) => {
    e.preventDefault()
    updateColumn({ boardId: id.board, columnId: id.column, column })
    closeModal()
  }

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <h2 className={style.title}>Edit Column</h2>
      <Input value={column.name} label={'Name'} name={'name'} onChange={handleChange} />
      <div className={style.tasks}>
        <h4 className={style.label}>Tasks</h4>
        <ul className={style.list}>
          {column?.tasks.map((task, index) => {
            return (
              <li className={style.item} key={index}>
                <Input name={task.title} value={task.title} onChange={(e) => handleChangeTask(e, index)} />
                <Icon icon="trash" className={style.item__icon} onClick={() => handleRemoveTask(index)} />
              </li>
            )
          })}
        </ul>
        <CreateItemField title={'column'} createItem={handleCreateTask} />
      </div>
      <button className={style.btn__save} type="submit">
        Save Changes
      </button>
    </form>
  )
}
