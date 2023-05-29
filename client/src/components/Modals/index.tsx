/* Store */
import { useAppDispatch, useAppSelector } from '@hooks/useRedux'
import { closeModal } from '@store/reducers/modalSlice'

/* Modals */
import ViewTask from './ViewTask/ViewTask'
import EditTask from './EditTask/EditTask'
import AddNewTask from './AddNewTask/AddNewTask'
import AddNewBoard from './AddNewBoard/AddNewBoard'
import DeleteTask from './DeleteTask/DeleteTask'
import EditBoard from './EditBoard/EditBoard'
import DeleteBoard from './DeleteBoard/DeleteBoard'

/* Styles */
import style from './index.module.scss'

const Modals: React.FC = () => {
  const dispatch = useAppDispatch()

  // Get modal from store
  const modal = useAppSelector((store) => store.modal)

  const { activeBoard: board, activeTask: task, activeColumn: column } = useAppSelector((store) => store.boards)

  const activeId = {
    board: board._id,
    column: column._id,
    task: task._id,
  }

  // Close modal
  const handleClose = () => {
    dispatch(closeModal())
  }
  return (
    <>
      {modal.status && (
        <div className={style.overlay} onClick={handleClose}>
          <div className={style.modal} onClick={(e) => e.stopPropagation()}>
            {modal.name == 'AddNewTask' && <AddNewTask />}
            {modal.name == 'ViewTask' && <ViewTask task={task} id={activeId} />}
            {modal.name == 'EditTask' && <EditTask task={modal.data} />}
            {modal.name == 'DeleteTask' && <DeleteTask id={activeId} name={task.title} />}
            {modal.name == 'AddNewBoard' && <AddNewBoard />}
            {modal.name == 'EditBoard' && <EditBoard board={modal.data} />}
            {modal.name == 'DeleteBoard' && <DeleteBoard id={board._id} name={board.name} />}
          </div>
        </div>
      )}
    </>
  )
}
export default Modals
