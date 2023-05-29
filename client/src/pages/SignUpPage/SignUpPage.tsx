import { useState } from 'react'

/* Routes */
import { NavLink } from 'react-router-dom'

/* Store */
import { useAppDispatch } from '@hooks/useRedux'
import { useSignupMutation } from '@store/reducers/authApi'
import { setToken } from '@store/reducers/authSlice'

/* Styles */
import style from './SignUpPage.module.scss'

/* Components */
import { CheckBox, Input } from '@components'

/* Utils */
import { defaultFormData } from '@/utils/form'
import { patternEmail, patternPassword } from '@/utils/patterns'

export default function SignUpPage() {
  const dispatch = useAppDispatch()

  /* Form logic */

  const [form, setForm] = useState(defaultFormData)

  const [signup, { isError: loginError }] = useSignupMutation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleChecked = () => {
    setForm((prev) => ({ ...prev, rememberUser: !prev.rememberUser }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await signup(form)
      dispatch(setToken({ token: data.token, rememberUser: form.rememberUser }))
    } catch (error) {
      setForm(defaultFormData)
    }
  }

  return (
    <div className={style.signup}>
      <div className={style.field}>
        <div className={style.header}>
          <h1 className={style.title}>SignUp user</h1>
          <NavLink to={'/login'} className={style.link}>
            login
          </NavLink>
        </div>

        <form onSubmit={handleSubmit} className={style.form}>
          <Input
            name={'email'}
            placeholder={'Enter the email'}
            errorMessage={'Wrong format'}
            required={true}
            pattern={patternEmail}
            label={'Email'}
            value={form.email}
            onChange={handleChange}
            tooltip={'Example name@gmail.com'}
          />

          <Input
            name={'password'}
            placeholder={'Enter the password'}
            errorMessage={'Password is not have correct format'}
            required={true}
            pattern={patternPassword}
            label={'Password'}
            value={form.password}
            onChange={handleChange}
            tooltip={'8 - 16, example length Asd/12sd'}
          />

          {loginError && <span className={style.error}>User is not found or Password in not correct</span>}

          <CheckBox title={'Remember me'} checked={form.rememberUser} onChange={handleChecked} />

          <button type="submit" className={`${style.btn}`} name="login">
            signup
          </button>
        </form>
      </div>
    </div>
  )
}
