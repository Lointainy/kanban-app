import { useEffect, useState } from 'react'

/* Store */
import { useAppDispatch } from '@hooks/useRedux'
import { moveTask } from '@store/reducers/boardSlice'

/* Styles */
import style from './Column.module.scss'

/* Components */
import { NewTask, Task } from '@components/Board'

const Column: React.FC = ({ column }) => {
  const dispatch = useAppDispatch()

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

  return (
    <div onDragOver={(e) => onDraggingOver(e)} onDrop={(e) => dragDrop(e)} className={style.column}>
      <span className={style.name}>{column.name}</span>
      <div className={style.tasks}>
        {column?.tasks.map((task, index) => {
          return <Task task={task} key={task._id} columnId={column._id} taskIndex={index} onDrop={dragDrop} />
        })}
        <div className={style.add}>
          <NewTask columnId={column._id} />
        </div>
      </div>
    </div>
  )
}
export default Column
