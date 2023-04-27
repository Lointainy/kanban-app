/* Router */
import { useParams } from 'react-router-dom'

/* Store */
import { useAppDispatch } from '@hooks/useRedux'
import { moveTask, setActiveColumn, setActiveTask } from '@store/reducers/boardSlice'
import { useAddTaskMutation, useDeleteColumnMutation } from '@store/reducers/boardsApi'

/* Styles */
import style from './Column.module.scss'

/* Components */
import { CreateItemForm, Task } from '@components/Board'
import { DropdownOptions } from '@components'

const Column: React.FC = ({ column }) => {
  const dispatch = useAppDispatch()

  const [addTask] = useAddTaskMutation()

  const { boardId } = useParams()

  const options = [
    { label: 'Edit column', onClick: handleEditColumn },
    { label: 'Delete column', error: true, onClick: handleDeleteColumn },
  ]

  const [deleteColumn] = useDeleteColumnMutation()

  const onDraggingOver = (e) => {
    e.preventDefault()
  }

  const dragDrop = (e) => {
    const transferedTaskId = e.dataTransfer.getData('taskId')
    const parentColumnId = e.dataTransfer.getData('parentColumnId')
    const transferedTaskIndex = e.dataTransfer.getData('taskIndex')
    const newTaskId = e.target.id

    dispatch(
      moveTask({
        taskId: transferedTaskId,
        parentColumnId: parentColumnId,
        newParentColumnId: column._id,
        taskIndex: transferedTaskIndex,
        newTaskId: newTaskId,
      })
    )
  }

  const handleCreate = (value: string) => {
    addTask({ boardId: boardId, columnId: column._id, task: { title: value } })
  }

  const setActive = (task) => {
    dispatch(setActiveTask(task))
    dispatch(setActiveColumn(column))
  }

  function handleDeleteColumn() {
    deleteColumn({ boardId: boardId, columnId: column._id })
  }

  function handleEditColumn() {
    console.log('edit')
  }

  return (
    <div onDragOver={(e) => onDraggingOver(e)} onDrop={(e) => dragDrop(e)} className={style.column}>
      <div className={style.head}>
        <span className={style.name}>{column.name}</span>
        <DropdownOptions options={options} fieldStyle={'invert'} />
      </div>
      <div className={style.tasks}>
        {column?.tasks.map((task, index) => {
          return (
            <Task
              task={task}
              key={task._id}
              columnId={column._id}
              taskIndex={index}
              onDrop={dragDrop}
              onOpen={setActive}
            />
          )
        })}
        <div className={style.add}>
          <CreateItemForm title={'task'} createItem={handleCreate} />
        </div>
      </div>
    </div>
  )
}
export default Column
