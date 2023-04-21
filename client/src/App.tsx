import { useEffect } from 'react'

/* Router */
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

/* Store */
import { useAppDispatch, useAppSelector } from '@hooks/useRedux'
import { getToken } from '@store/reducers/authSlice'
import { setTheme } from '@store/reducers/uiSlice'
import { setBoards } from '@store/reducers/boardSlice'
import { useGetBoardsQuery } from '@store/reducers/boardsApi'

/* Hooks */
import useTheme from '@hooks/useTheme'

/* Pages */
import { BoardPage, HomePage, NotFoundPage, SignUpPage, LoginPage } from '@pages'
import { Header, Sidebar } from '@/layout'
import { Modals } from '@components'

/* Styles */
import style from './App.module.scss'

export const App: React.FC = () => {
  const dispatch = useAppDispatch()

  // Routes
  const navigate = useNavigate()
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
    // Check token key
    dispatch(getToken())
  }, [dispatch])

  // Get data from API
  const boards = useGetBoardsQuery('')

  useEffect(() => {
    // if user is login in to reveved data
    if (userLogined) {
      boards.refetch()
    }
    // if user is not loggined reset board
    if (!userLogined) {
      dispatch(setBoards([]))
      navigate('/login')
    }

    if (userLogined && pathname.includes('/login')) {
      navigate('/')
    }
  }, [userLogined, navigate])

  useEffect(() => {
    // If response success, set boards data to store
    if (boards.isSuccess) {
      dispatch(setBoards(boards.data))
    }
  }, [boards])

  return (
    <div className={`${style.app} ${theme} ${!userLogined && style.sidebar_open}`}>
      {modalOpen && <Modals />}
      <Header />
      <Sidebar />
      <div className={style.content}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/signup'} element={<SignUpPage />} />
          <Route path={'board/:boardId'} element={<BoardPage />} />
          <Route path={'*'} element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  )
}
export default App
