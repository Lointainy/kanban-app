import React from 'react'

import style from './TextArea.module.scss'

interface Props {
  label?: string
  value: string
  name: string
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea: React.FC<Props> = (props) => {
  const { label, value, onChange, name, placeholder } = props
  return (
    <div className={style.field}>
      <h4 className={style.label}>{label}title</h4>
      <textarea className={style.area} name={name} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  )
}

export default TextArea
