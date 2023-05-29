import { useEffect, useState } from 'react'

/* Store */
import { useAppDispatch } from '@hooks/useRedux'
import { openModal } from '@store/reducers/modalSlice'
import { useAddSubtaskMutation } from '@/store/reducers/boardsApi'

/* Hooks */
import { useToggle } from '@hooks/useToggle'
import { useCalculateCompleted } from '@hooks/useCalculateCompleted'

/* Styles */
import style from './ViewTask.module.scss'

/* Components */
import { DropdownOptions, CheckBox } from '@components'
import { CreateItemForm } from '@/components/Board'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

const ViewTask: React.FC = (props) => {
  const dispatch = useAppDispatch()

  const id = props.id

  // Get Task from props or set after change
  const [task, setTask] = useState(props.task)

  // Dropdown Toggle
  const { toggle: statusDropdown, handleToggle: statusDropdownToggle } = useToggle(false)

  // Counting completed tasks and their total number
  const { completed, total, setSubtasks } = useCalculateCompleted()

  // Get Task status or set after change
  const [status, setStatus] = useState(task.status)

  const [addSubtask] = useAddSubtaskMutation()

  // Status list
  const statusList = ['Todo', 'Doing', 'Done']

  // Option list
  const options = [
    {
      label: 'Edit task',
      onClick: () => handleClickOption('EditTask'),
    },
    {
      label: 'Delete task',
      error: true,
      onClick: () => handleClickOption('DeleteTask'),
    },
  ]

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

  const handleClickOption = (name: string) => {
    switch (name) {
      case 'EditTask':
        dispatch(openModal({ name: 'EditTask' }))
        break
      case 'DeleteTask':
        dispatch(openModal({ name: 'DeleteTask' }))
        break
    }
  }

  const handleCreateSubtasks = (value: string) => {
    addSubtask({ boardId: id.board, columnId: id.column, taskId: id.task, subtask: { title: value } })
  }

  useEffect(() => {
    setSubtasks(task.subtasks)
  }, [task])

  useEffect(() => {
    setTask(props.task)
  }, [props.task])

  return (
    <div className={style.field}>
      <div className={style.wrapper}>
        <h2 className={style.title}>{task.title}</h2>
        <DropdownOptions options={options} />
      </div>
      <p className={style.desc}>{task?.description ? task.description : 'no description'}</p>
      <span className={style.subtitle}>{`Subtasks (${completed} of ${total})`}</span>
      <div className={style.subtasks}>
        <CreateItemForm title={'subtask'} createItem={handleCreateSubtasks} />
        <ul className={style.subtasks__list}>
          {task.subtasks.map((subtask) => {
            return (
              <li className={style.subtasks__item} key={subtask._id}>
                <CheckBox
                  checked={subtask.isCompleted}
                  onChange={() => onChangeSubtask(subtask._id)}
                  title={subtask.title}
                />
              </li>
            )
          })}
        </ul>
      </div>
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
