import { useEffect } from 'react'

/* Router */
import { Route, Routes, useLocation } from 'react-router-dom'

/* Store */
import { useAppDispatch, useAppSelector } from '@hooks/useRedux'
import { setActiveBoard } from '@store/reducers/boardSlice'
import { useGetBoardsQuery } from '@store/reducers/boardsApi'
import { setTheme } from '@store/reducers/uiSlice'

/* Hooks */
import useTheme from '@hooks/useTheme'
import authWrapper from './hooks/authWrapper'

/* Styles */
import './App.scss'

/* Pages */
import { BoardPage, HomePage, LoginPage, NotFoundPage, SignUpPage } from '@pages'

/* Components */
import { Header, Sidebar } from '@/layout'
import { Modals, ToggleSidebar } from '@components'

export const App: React.FC = () => {
  const dispatch = useAppDispatch()

  // Routes
  const { pathname } = useLocation()

  // Get name of theme from localStorage or set default
  const { userTheme } = useTheme()

  const modalOpen = useAppSelector((store) => store.modal.status) // Open modal
  const userLogined = useAppSelector((store) => store.auth.login) // loginned

  // Status theme
  const { colorTheme: theme, sidebar } = useAppSelector((store) => store.ui)

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
      boards.refetch()
    }
  }, [userLogined, pathname, boards.data, boards.isLoading, boards.isSuccess])

  if (userLogined && !pathname.includes('/login')) {
    return (
      <div className={`App ${theme}`}>
        <div className="grid">
          {modalOpen && <Modals />}
          <Header />
          {sidebar ? <Sidebar boards={boards} /> : <ToggleSidebar />}
          <div className={`page-content ${!sidebar ? 'fullsize' : ''}`}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path={'board/:boardId'} element={<BoardPage />} />
              <Route path={'*'} element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`App ${theme}`}>
      <Routes>
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/signup'} element={<SignUpPage />} />
        <Route path={'*'} element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default authWrapper(App)
