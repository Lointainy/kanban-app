import { useEffect, useState } from 'react'

export function useCalculateCompleted() {
  const [completed, setCompleted] = useState(0)
  const [total, setTotal] = useState(0)
  const [subtasks, setSubtasks] = useState([])

  useEffect(() => {
    if (subtasks.length) {
      setCompleted(subtasks.filter((subtask) => subtask.isCompleted).length)
      setTotal(subtasks.length)
    }
  }, [subtasks])

  return { completed, total, setSubtasks }
}
