import React from 'react'

import style from './CheckBox.module.scss'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

export default function CheckBox(props) {
  const { title, checked, onChange } = props
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={style.checkbox}>{checked && <Icon icon="check" />}</span>
      <span className={style.subtasks__title}>{title}</span>
    </label>
  )
}
