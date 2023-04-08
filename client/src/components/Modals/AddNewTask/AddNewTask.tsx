/* Styles */
import { useState } from 'react'
import style from './AddNewTask.module.scss'

/* Components */
import { Input } from '@components'

const AddNewTask: React.FC = () => {
  const [form, setForm] = useState({
    title: 'title',
    desc: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {}

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new Task</h2>
      <Input
        name={'username'}
        placeholder={'Alexei Ward'}
        errorMessage={'wrong format'}
        required={true}
        pattern={'^[A-Za-z]{3,24}$'}
        label={'Name'}
        onChange={handleChange}
      />
    </form>
  )
}
export default AddNewTask
