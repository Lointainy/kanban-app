/* Store */
import { useAppDispatch } from '@hooks/useRedux'
import { openModal } from '@store/reducers/modalSlice'

/* Hooks */
import { useCalculateCompleted } from '@hooks/useCalculateCompleted'

/* Styles */
import style from './Task.module.scss'

/* Utils */
import { useEffect } from 'react'
import { setActiveTask } from '@/store/reducers/boardSlice'

const Task: React.FC = ({ task, onOpen }) => {
  const dispatch = useAppDispatch()
  // Counting completed tasks and their total number
  const { completed, total, setSubtasks } = useCalculateCompleted()

  useEffect(() => {
    setSubtasks(task.subtasks)
  }, [task])

  const handleOpenTask = () => {
    onOpen(task)
    dispatch(openModal({ name: 'ViewTask', data: task }))
  }

  useEffect(() => {
    dispatch(setActiveTask(task))
  }, [task])

  return (
    <div draggable onClick={handleOpenTask} id={task._id} className={style.task}>
      <h3 className={style.title}>{task.title}</h3>
      <span className={style.subtitle}>{`${completed} of ${total} subtasks`}</span>
    </div>
  )
}
export default Task
