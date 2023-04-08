import { useEffect, useState } from 'react'

/* Store */
import { useAppDispatch } from '@hooks/useRedux'
import { moveTask } from '@store/reducers/boardSlice'

/* Styles */
import style from './Column.module.scss'

/* Components */
import { Task } from '@components/Board'

const Column: React.FC = ({ column }) => {
  const dispatch = useAppDispatch()

  const onDraggingOver = (e) => {
    e.preventDefault()
  }

  const dragDrop = (e) => {
    let transferedTaskId = e.dataTransfer.getData('taskId')
    let parentColumnId = e.dataTransfer.getData('parentColumnId')
    let transferedTaskIndex = e.dataTransfer.getData('taskIndex')
    let newTaskId = e.target.id

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
        <button className={style.tasks__add}>add task</button>
      </div>
    </div>
  )
}
export default Column
