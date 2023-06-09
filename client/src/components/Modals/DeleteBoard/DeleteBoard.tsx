/* Routes */
import { useNavigate } from 'react-router-dom'

/* Store */
import { useAppDispatch } from '@hooks/useRedux'
import { useDeleteBoardMutation } from '@store/reducers/boardsApi'
import { closeModal } from '@store/reducers/modalSlice'

/* Styles */
import style from './DeleteBoard.module.scss'

const DeleteBoard: React.FC = ({ id, name }) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [deleteBoard] = useDeleteBoardMutation()
  const handleDeleteBoard = () => {
    deleteBoard(id)
    dispatch(closeModal())
    navigate('/')
  }
  return (
    <div className={style.field}>
      <h2 className={style.title}>Delete boards</h2>
      <p className={style.desc}>
        {`Are you sure you want to delete the '${name}' board? This action will remove all columns and tasks and cannot
        be reversed.`}
      </p>
      <div className={style.btn__wrapper}>
        <button className={style.btn__delete} onClick={() => handleDeleteBoard()}>
          delete
        </button>
        <button className={style.btn__cancel} onClick={() => dispatch(closeModal())}>
          cancel
        </button>
      </div>
    </div>
  )
}
export default DeleteBoard
