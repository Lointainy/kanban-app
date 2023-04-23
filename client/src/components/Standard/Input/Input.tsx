import React, { PropsWithChildren, useState } from 'react'

/* Styles */
import style from './Input.module.scss'

/* Types */
interface Props extends PropsWithChildren {
  name: string
  placeholder?: string
  errorMessage?: string
  required?: boolean
  pattern?: string
  label?: string
  value: string
  className?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input: React.FC<Props> = (props) => {
  const { label, errorMessage, className, onChange, ...inputProps } = props

  const [focused, setFocused] = useState<boolean>(false)

  const focus: string = focused.toString()

  const handleFocus = (): void => {
    setFocused(true)
  }

  return (
    <div className={`${style.field} ${className && style[className]}`}>
      <input
        type="text"
        {...inputProps}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        onBlur={handleFocus}
        focused={focus}
        className={style.input}
      />
      <h4 className={style.label}>{label}</h4>
      <span className={style.error}>{errorMessage}</span>
    </div>
  )
}
export default Input
