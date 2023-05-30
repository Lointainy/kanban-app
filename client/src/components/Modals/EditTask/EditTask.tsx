import { useState } from 'react'

/* Styles */
import style from './EditTask.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

/* Components */
import { CreateItemField } from '@/components/Board'
import { Input, SelectDropdown, TextArea } from '@components'

/* Utils */
import { useUpdateTaskMutation } from '@/store/reducers/boardsApi'
import { defaultStatusData as statusList } from '@utils/default'

const EditTask: React.FC = (props) => {
  const { id, closeModal } = props

  const [task, setTask] = useState(props.task)

  const [selectedStatus, setSelectedStatus] = useState(statusList[0])

  const [updateTask] = useUpdateTaskMutation()

  /* OnChange Inputs */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTask({ ...task, [name]: value })
  }

  /* Change Selected status */
  const handleChangeStatus = (index: number) => {
    const value = statusList[index]
    setSelectedStatus(value)
    setTask({ ...task, status: value })
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

  /* Submit form, update task */
  const handleSubmit = (e) => {
    e.preventDefault()
    updateTask({ boardId: id.board, columnId: id.column, taskId: id.task, task })
    closeModal()
  }
  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <h2 className={style.title}>Edit Task</h2>
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
        <CreateItemField title={'subtask'} createItem={handleCreateSubtask} />
      </div>
      <SelectDropdown selected={selectedStatus} list={statusList} handleChange={handleChangeStatus} label={'Status'} />

      <button className={style.btn__save} type="submit">
        Save Changes
      </button>
    </form>
  )
}
export default EditTask
