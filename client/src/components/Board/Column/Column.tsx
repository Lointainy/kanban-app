import { useEffect, useState } from 'react'

/* Store */
import { useAppDispatch } from '@hooks/useRedux'
import { moveTask, setActiveColumn, setActiveTask } from '@store/reducers/boardSlice'

/* Styles */
import style from './Column.module.scss'

/* Components */
import { CreateItemForm, Task } from '@components/Board'
import { useAddTaskMutation } from '@/store/reducers/boardsApi'
import { useParams } from 'react-router-dom'

const Column: React.FC = ({ column }) => {
  const dispatch = useAppDispatch()

  const [addTask] = useAddTaskMutation()

  const { boardId } = useParams()

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

  return (
    <div onDragOver={(e) => onDraggingOver(e)} onDrop={(e) => dragDrop(e)} className={style.column}>
      <span className={style.name}>{column.name}</span>
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
