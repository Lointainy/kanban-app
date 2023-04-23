/* Styles */
import { deleteTask } from '@/store/reducers/boardSlice'
import style from './DeleteTask.module.scss'

/* Store */
import { useAppDispatch } from '@hooks/useRedux'
import { closeModal } from '@store/reducers/modalSlice'

const DeleteTask: React.FC = ({ id, name }) => {
  const dispatch = useAppDispatch()

  const handleDeleteTask = () => {
    dispatch(closeModal())
    dispatch(deleteTask(id))
  }

  return (
    <div className={style.field}>
      <h2 className={style.title}>Delete Task</h2>
      <p className={style.desc}>
        {`Are you sure you want to delete the '${name}' task? This action will remove all subtasks and cannot
        be reversed.`}
      </p>
      <div className={style.btn__wrapper}>
        <button className={style.btn__delete} onClick={() => handleDeleteTask()}>
          delete
        </button>
        <button className={style.btn__cancel} onClick={() => dispatch(closeModal())}>
          cancel
        </button>
      </div>
    </div>
  )
}
export default DeleteTask
