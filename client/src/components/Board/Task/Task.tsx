/* Store */
import { useAppDispatch } from '@hooks/useRedux'
import { openModal } from '@store/reducers/modalSlice'

/* Hooks */
import { useCalculateCompleted } from '@hooks/useCalculateCompleted'

/* Styles */
import style from './Task.module.scss'

/* Utils */
import { useEffect } from 'react'

const Task: React.FC = ({ task, columnId, taskIndex, onOpen }) => {
  const dispatch = useAppDispatch()
  // Counting completed tasks and their total number
  const { completed, total, setSubtasks } = useCalculateCompleted()

  useEffect(() => {
    setSubtasks(task.subtasks)
  }, [task])

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId)
    e.dataTransfer.setData('parentColumnId', columnId)
    e.dataTransfer.setData('taskIndex', taskIndex)
  }

  const handleOpenTask = () => {
    onOpen(task)
    dispatch(openModal({ name: 'ViewTask', data: task }))
  }

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task._id)}
      onClick={handleOpenTask}
      id={task._id}
      className={style.task}>
      <h3 className={style.title}>{task.title}</h3>
      <span className={style.subtitle}>{`${completed} of ${total} subtasks`}</span>
    </div>
  )
}
export default Task
