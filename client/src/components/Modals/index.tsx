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
            {modal.name == 'ViewTask' && <ViewTask task={modal.data} />}
            {modal.name == 'EditTask' && <EditTask task={modal.data} />}
            {modal.name == 'DeleteTask' && <DeleteTask id={modal.data._id} name={modal.data.title} />}
            {modal.name == 'AddNewBoard' && <AddNewBoard />}
            {modal.name == 'EditBoard' && <EditBoard board={modal.data} />}
            {modal.name == 'DeleteBoard' && <DeleteBoard id={modal.data._id} name={modal.data.name} />}
          </div>
        </div>
      )}
    </>
  )
}
export default Modals
