/* Store */
import { useAppDispatch } from '@hooks/useRedux'
import { useDeleteColumnMutation } from '@store/reducers/boardsApi'
import { closeModal } from '@store/reducers/modalSlice'

/* Styles */
import style from './DeleteColumn.module.scss'

const DeleteColumn: React.FC = ({ id, name }) => {
  const dispatch = useAppDispatch()

  const [deleteColumn] = useDeleteColumnMutation()

  const handleDeleteColumn = () => {
    deleteColumn({ boardId: id.board, columnId: id.column })
    dispatch(closeModal())
  }
  return (
    <div className={style.field}>
      <h2 className={style.title}>Delete Column</h2>
      <p className={style.desc}>
        {`Are you sure you want to delete the '${name}' column? This action will remove all tasks and subtasks and cannot
        be reversed.`}
      </p>
      <div className={style.btn__wrapper}>
        <button className={style.btn__delete} onClick={() => handleDeleteColumn()}>
          delete
        </button>
        <button className={style.btn__cancel} onClick={() => dispatch(closeModal())}>
          cancel
        </button>
      </div>
    </div>
  )
}
export default DeleteColumn
