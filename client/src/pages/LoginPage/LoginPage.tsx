import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { useLoginMutation } from '@/store/reducers/authApi'
import { logout, setToken } from '@/store/reducers/authSlice'
import { useState } from 'react'

/* Styles */
import style from './LoginPage.module.scss'

export default function LoginPage() {
  const dispatch = useAppDispatch()

  const user = useAppSelector((store) => store.auth.token)

  /* Form logic */

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [login, { error }] = useLoginMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await login(form)
      dispatch(setToken(data.token))
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <>
      {user}
      <button onClick={handleLogout}>logout</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          <span>Email</span>
          <input type="text" name="email" onChange={handleChange} value={form.email} />
        </label>
        <label htmlFor="">
          <span>Name</span>
          <input type="text" name="password" onChange={handleChange} value={form.password} />
        </label>
        <button type="submit">login</button>
      </form>
    </>
  )
}
