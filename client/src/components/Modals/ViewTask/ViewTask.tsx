import { useEffect, useState } from 'react'

/* Store */
import { useAppDispatch } from '@hooks/useRedux'
import { useUpdateTaskMutation } from '@store/reducers/boardsApi'
import { openModal } from '@store/reducers/modalSlice'

/* Hooks */
import { useCalculateCompleted } from '@hooks/useCalculateCompleted'

/* Styles */
import style from './ViewTask.module.scss'

/* Components */
import { CreateItemField } from '@/components/Board'
import { CheckBox, DropdownOptions, SelectDropdown } from '@components'

/* Utils */
import { defaultStatusData as statusList } from '@utils/default'

const ViewTask: React.FC = (props) => {
  const dispatch = useAppDispatch()

  const { id } = props

  const [task, setTask] = useState(props.task)

  // Counting completed tasks and their total number
  const { completed, total, setSubtasks } = useCalculateCompleted()

  const [selectedStatus, setSelectedStatus] = useState(props.task.status || statusList[0])

  const [updateTask] = useUpdateTaskMutation()

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
  const handleChangeStatus = (index: number) => {
    const value = statusList[index]
    setSelectedStatus(value)
    setTask({ ...task, status: value })
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
    const updatedSubtasks = [...task.subtasks]
    updatedSubtasks.push({ title: value, isCompleted: false })
    setTask({ ...task, subtasks: updatedSubtasks })
  }

  /* Debounce */
  const [debouncedUpdatedTask, setDebouncedUpdatedTask] = useState(null)

  // Request to API for update task
  const updateTaskData = () => {
    if (debouncedUpdatedTask) {
      updateTask({ boardId: id.board, columnId: id.column, taskId: id.task, task: debouncedUpdatedTask })
    }
  }

  // Update after have changes in task
  useEffect(() => {
    setSubtasks(task.subtasks)
    setDebouncedUpdatedTask(task)
  }, [task])

  // Update after request
  useEffect(() => {
    const delay = 500
    const timeoutId = setTimeout(() => {
      updateTaskData()
    }, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [debouncedUpdatedTask])
  return (
    <div className={style.field}>
      <div className={style.wrapper}>
        <h2 className={style.title}>{task.title}</h2>
        <DropdownOptions options={options} />
      </div>
      <p className={style.desc}>{task?.description ? task.description : 'no description'}</p>
      <span className={style.subtitle}>{`Subtasks (${completed} of ${total})`}</span>
      <div className={style.subtasks}>
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
        <CreateItemField title={'subtask'} createItem={handleCreateSubtasks} />
      </div>
      {/* Status select dropdown*/}
      <SelectDropdown selected={selectedStatus} list={statusList} handleChange={handleChangeStatus} label={'Status'} />
    </div>
  )
}
export default ViewTask
