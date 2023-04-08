import { useEffect, useState } from 'react'

/* Store */
import { useAppDispatch } from '@hooks/useRedux'
import { updateTask } from '@store/reducers/boardSlice'

/* Hooks */
import { useToggle } from '@hooks/useToggle'
import { useCalculateCompleted } from '@hooks/useCalculateCompleted'

/* Styles */
import style from './ViewTask.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { openModal } from '@/store/reducers/modalSlice'

const ViewTask: React.FC = (props) => {
  const dispatch = useAppDispatch()

  // Get Task from props or set after change
  const [task, setTask] = useState(props.task)

  // Dropdown Toggle
  const { toggle: optionDropdown, handleToggle: optionDropdownToggle } = useToggle(false)
  const { toggle: statusDropdown, handleToggle: statusDropdownToggle } = useToggle(false)

  //Counting completed tasks and their total number
  const { completed, total, setSubtasks } = useCalculateCompleted()

  useEffect(() => {
    setSubtasks(task.subtasks)
  }, [task])

  // Status list
  const statusList = ['Todo', 'Doing', 'Done']

  // Get Task status or set after change
  const [status, setStatus] = useState(task.status)

  // set task after change subtask
  const onChangeSubtask = (id) => {
    let subtasks = task.subtasks.slice()
    subtasks = subtasks.map((subtask) =>
      subtask._id == id ? { ...subtask, isCompleted: !subtask.isCompleted } : subtask
    )
    setTask({ ...task, subtasks: subtasks })
  }

  // set task after change status
  const handleChangeTaskStatus = (value) => {
    setStatus(value)
    setTask({ ...task, status: value })
    statusDropdownToggle()
  }

  // After change task set updated task to store
  useEffect(() => {
    dispatch(updateTask(task))
  }, [task])

  return (
    <div className={style.field}>
      <div className={style.wrapper}>
        <h2 className={style.title}>{task.title}</h2>
        <div className={style.option}>
          <button className={style.button} onClick={optionDropdownToggle}>
            <Icon icon="ellipsis-vertical" className={style.icon} />
          </button>
          {optionDropdown && (
            <div className={style.option__dropdown}>
              <ul className={style.option__dropdown_list}>
                <li
                  className={style.option__dropdown_item}
                  onClick={() => dispatch(openModal({ name: 'EditTask', data: props.task }))}>
                  Edit task
                </li>
                <li
                  className={`${style.option__dropdown_item} ${style.error}`}
                  onClick={() => dispatch(openModal({ name: 'DeleteTask', data: props.task._id }))}>
                  delete task
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <p className={style.desc}>{task?.description ? task.description : 'no description'}</p>
      <span className={style.subtitle}>{`Subtasks (${completed} of ${total})`}</span>
      <ul className={style.subtasks}>
        {task.subtasks.map((subtask) => {
          return (
            <li className={style.subtasks__item} key={subtask._id}>
              <label>
                <input type="checkbox" checked={subtask.isCompleted} onChange={() => onChangeSubtask(subtask._id)} />
                <span className={style.checkbox}>{subtask.isCompleted && <Icon icon="check" />}</span>
                <span className={style.subtasks__title}>{subtask.title}</span>
              </label>
            </li>
          )
        })}
      </ul>
      <span className={style.subtitle}>Current Status</span>

      <div className={style.status}>
        <div className={style.status__current} onClick={statusDropdownToggle}>
          <span className={style.status__title}>{status}</span>
          <Icon icon="chevron-down" className={style.status__icon} />
        </div>
        {statusDropdown && (
          <div className={style.status__dropdown}>
            <ul className={style.status__dropdown_list}>
              {statusList.map((item, index) => {
                return (
                  <li key={index} className={style.status__dropdown_item} onClick={() => handleChangeTaskStatus(item)}>
                    {item}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
export default ViewTask
