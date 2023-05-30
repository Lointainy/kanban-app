/* Router */
import { useParams } from 'react-router-dom'

/* Store */
import { useAppDispatch } from '@hooks/useRedux'
import { setActiveColumn, setActiveTask } from '@store/reducers/boardSlice'
import { useAddTaskMutation } from '@store/reducers/boardsApi'

/* Styles */
import style from './Column.module.scss'

/* Components */
import { openModal } from '@/store/reducers/modalSlice'
import { DropdownOptions } from '@components'
import { CreateItemField, Task } from '@components/Board'
import { Draggable } from 'react-beautiful-dnd'

const Column: React.FC = ({ column }) => {
  const dispatch = useAppDispatch()

  const [addTask] = useAddTaskMutation()

  const { boardId } = useParams()

  const options = [
    { label: 'Edit column', onClick: handleEditColumn },
    { label: 'Delete column', error: true, onClick: handleDeleteColumn },
  ]

  const handleCreate = (value: string) => {
    addTask({ boardId: boardId, columnId: column._id, task: { title: value } })
  }

  const setActive = (task) => {
    dispatch(setActiveTask(task))
    dispatch(setActiveColumn(column))
  }

  function handleDeleteColumn() {
    dispatch(openModal({ name: 'DeleteColumn' }))
    dispatch(setActiveColumn(column))
  }

  function handleEditColumn() {
    console.log('edit')
  }

  return (
    <div className={style.column}>
      <div className={style.head}>
        <span className={style.name}>{column.name}</span>
        <CreateItemField title={'task'} createItem={handleCreate} dropdown />
        <DropdownOptions options={options} fieldStyle={'invert'} buttonStyle={'invert'} />
      </div>

      <div className={style.tasks}>
        {column?.tasks.map((task, index) => {
          return (
            <Draggable key={task._id} draggableId={task._id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={snapshot.isDragging ? style.drag : ''}>
                  <Task task={task} key={task._id} columnId={column._id} taskIndex={index} onOpen={setActive} />
                </div>
              )}
            </Draggable>
          )
        })}
      </div>
    </div>
  )
}
export default Column
