import { useEffect } from 'react'

/* Router */
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

/* Store */
import { useAppDispatch, useAppSelector } from '@hooks/useRedux'
import { setTheme } from '@store/reducers/uiSlice'
import { setActiveBoard, setBoards } from '@store/reducers/boardSlice'
import { useGetBoardsQuery } from '@store/reducers/boardsApi'

/* Hooks */
import useTheme from '@hooks/useTheme'

/* Pages */
import { BoardPage, HomePage, NotFoundPage, SignUpPage, LoginPage } from '@pages'
import { Header, Sidebar } from '@/layout'
import { Modals } from '@components'

/* Styles */
import style from './App.module.scss'
import authWrapper from './hooks/authWrapper'

export const App: React.FC = () => {
  const dispatch = useAppDispatch()

  // Routes
  const { pathname } = useLocation()

  // Get name of theme from localStorage or set default
  const { userTheme } = useTheme()

  // Open modal
  const modalOpen = useAppSelector((store) => store.modal.status)

  const userLogined = useAppSelector((store) => store.auth.login)

  // Status theme
  const theme = useAppSelector((store) => store.ui.colorTheme)

  useEffect(() => {
    // Set theme name to store
    userTheme && dispatch(setTheme(userTheme))
  }, [dispatch])

  // Get data from API
  const boards = useGetBoardsQuery('')

  useEffect(() => {
    // Check the Path reset active board
    if (userLogined && !pathname.includes('/board/')) {
      dispatch(setActiveBoard({}))
    }

    // If user is logged in, fetch boards data and set it to store
    if (userLogined) {
      boards.refetch().then(() => {
        if (boards.isSuccess) {
          dispatch(setBoards(boards.data))
        }
      })
    }
  }, [userLogined, pathname, boards])

  if (userLogined && !pathname.includes('/login')) {
    return (
      <div className={`${style.app} ${theme}`}>
        {modalOpen && <Modals />}
        <Header />
        <Sidebar />
        <div className={style.content}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path={'board/:boardId'} element={<BoardPage />} />
            <Route path={'*'} element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    )
  }

  return (
    <div className={`${style.app} ${theme} ${style.fullscreen}`}>
      <div className={style.content}>
        <Routes>
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/signup'} element={<SignUpPage />} />
          <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default authWrapper(App)
