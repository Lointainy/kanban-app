import { useEffect, useState } from 'react'

/* Store */
import { useAppSelector } from '@hooks/useRedux'

/* Routes */
import { NavLink } from 'react-router-dom'

/* Styles */
import style from './Sidebar.module.scss'

/* Components */
import { Input, ThemeSwitcher } from '@components'

/* Icons */
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { useToggle } from '@/hooks/useToggle'
import { useAddBoardMutation } from '@/store/reducers/boardsApi'

const Sidebar: React.FC = () => {
  const { boards, activeBoard } = useAppSelector((store) => store.boards)

  const [activeId, setActiveId] = useState('')

  const { toggle: createDropdown, handleToggle: createDropdownToggle, setToggle: setCreateDropdown } = useToggle(false)

  const [newBoardName, setNewBoardName] = useState('')

  const boardsLength = boards ? boards.length : 0

  const [addBoard, { isLoading, isSuccess }] = useAddBoardMutation()

  const handleChangeNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBoardName(e.target.value)
  }

  const handleCreateBoard = () => {
    addBoard({ name: newBoardName })
    setCreateDropdown(false)
  }

  useEffect(() => {
    setActiveId(activeBoard._id)
  }, [activeBoard])

  return (
    <div className={style.sidebar}>
      <div className={style.boards}>
        <span className={style.title}>all boards {`(${boardsLength})`}</span>
        <ul className={style.links}>
          {boards.map((board) => {
            return (
              <li key={board._id} className={`${style.item} ${board._id === activeId ? style.active : ''} `}>
                <NavLink to={`board/${board._id}`} className={style.link}>
                  <Icon icon="layer-group" className={style.icon} />
                  <span className={style.name}>{board.name}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
        <div className={`${style.create}`}>
          {createDropdown && (
            <div className={style.create__field}>
              <Input
                name={'create'}
                placeholder={'Enter the board name'}
                required={true}
                className={'simple'}
                value={newBoardName}
                onChange={handleChangeNewName}
              />
              <button className={style.btn__create} onClick={() => handleCreateBoard()}>
                <Icon icon="plus" />
                <span>create</span>
              </button>
              <button className={style.btn__cancel} onClick={createDropdownToggle}>
                <span>Cancel</span>
              </button>
            </div>
          )}
          {!createDropdown && (
            <button className={`${style.btn}`} onClick={createDropdownToggle}>
              <Icon icon="plus" />
              <span>Create New Board</span>
            </button>
          )}
        </div>
      </div>
      <ThemeSwitcher />
    </div>
  )
}
export default Sidebar
