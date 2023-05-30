import { useState } from 'react'

/* Store */
import { useAddTaskMutation } from '@store/reducers/boardsApi'

/* Styles */
import style from './AddNewTask.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/* Utils */
import { defaultStatusData } from '@utils/default'

/* Components */
import { Input, SelectDropdown, TextArea } from '@components'
import { CreateItemField } from '@components/Board'

const AddNewTask: React.FC = ({ id, columns, closeModal }) => {
  // list for dropdown
  const statusList = defaultStatusData
  const columnsList = columns.map((column) => column.name)

  /* Selected dropdown value */
  const [selectedStatus, setSelectedStatus] = useState(statusList[0])
  const [selectedColumn, setSelectedColumn] = useState(columns[0])

  const [task, setTask] = useState({
    title: '',
    description: '',
    status: selectedStatus,
    subtasks: [],
  })

  const [addTask] = useAddTaskMutation()

  /* OnChange Inputs */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTask({ ...task, [name]: value })
  }

  /* OnChange Subtask input */
  const handleChangeSubtask = (e, index: number) => {
    const { value } = e.target
    const updatedSubtasks = task.subtasks.map((subtask, subtaskIndex) => {
      if (subtaskIndex === index) {
        return {
          ...subtask,
          title: value,
        }
      }
      return subtask
    })
    setTask({ ...task, subtasks: updatedSubtasks })
  }

  /* Change Selected status */
  const handleChangeStatus = (index: number) => {
    const value = statusList[index]
    setSelectedStatus(value)
    setTask({ ...task, status: value })
  }

  /* Change Selected column*/
  const handleChangeColumn = (index: number) => {
    const column = columns[index]
    setSelectedColumn(column)
  }

  /* Create new subTask */
  const handleCreateSubtask = (value) => {
    const updatedSubtasks = [...task.subtasks]
    updatedSubtasks.push({ title: value, isCompleted: false })
    setTask({ ...task, subtasks: updatedSubtasks })
  }

  /* Remove subtask */
  const handleRemoveSubtask = (index: number) => {
    const updatedSubtasks = task.subtasks.filter((_, subtaskIndex) => subtaskIndex !== index)
    setTask({ ...task, subtasks: updatedSubtasks })
  }

  /* Submit form, create task */
  const handleSubmit = (e) => {
    e.preventDefault()
    addTask({ boardId: id.board, columnId: selectedColumn._id, task })
    closeModal()
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h2 className={style.title}>Add new Task</h2>

      <Input
        value={task.title}
        name={'title'}
        placeholder={'Alexei Ward'}
        errorMessage={'wrong format'}
        required={true}
        pattern={'^[A-Za-z]{3,24}$'}
        label={'Name'}
        onChange={handleChange}
      />

      <TextArea
        name={'description'}
        value={task.description}
        onChange={handleChange}
        placeholder={'Enter description'}
      />

      <div className={style.subtasks}>
        <h4 className={style.label}>Subtasks</h4>
        <ul className={style.list}>
          {task.subtasks.map((subtask, index) => {
            return (
              <li className={style.item} key={index}>
                <Input name={subtask.title} value={subtask.title} onChange={(e) => handleChangeSubtask(e, index)} />
                <Icon icon="trash" className={style.item__icon} onClick={() => handleRemoveSubtask(index)} />
              </li>
            )
          })}
        </ul>
        <CreateItemField title={'task'} createItem={handleCreateSubtask} />
      </div>

      {/* Status select dropdown*/}
      <SelectDropdown selected={selectedStatus} list={statusList} handleChange={handleChangeStatus} label={'Status'} />

      {/* Column select dropdown */}
      <SelectDropdown
        selected={selectedColumn.name}
        list={columnsList}
        handleChange={handleChangeColumn}
        label={'Columns'}
      />

      <button className={style.btn__add} type="submit">
        Add new task
      </button>
    </form>
  )
}
export default AddNewTask
