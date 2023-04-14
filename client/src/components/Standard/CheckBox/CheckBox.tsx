import React from 'react'

import style from './CheckBox.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export default function CheckBox(props) {
  const { title, checked, onChange } = props
  return (
    <label className={style.label}>
      <input type="checkbox" checked={checked} onChange={onChange} className={style.input} />
      <span className={style.checkbox}>{checked && <Icon icon="check" />}</span>
      <span className={style.title}>{title}</span>
    </label>
  )
}
