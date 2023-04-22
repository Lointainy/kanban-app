import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '@store/reducers/authSlice'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './useRedux'

const AuthWrapper = (WrappedComponent) => {
  const AuthWrapperComponent = (props) => {
    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const userLogined = useAppSelector((store) => store.auth.login)

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
      // Check token key
      dispatch(getToken())

      // Set isMounted to true after first render
      setIsMounted(true)
    }, [dispatch])

    if (!userLogined && pathname !== '/login' && pathname !== '/signup' && isMounted) {
      return <Navigate to="/login" />
    }

    if (userLogined && (pathname === '/login' || pathname === '/signup') && isMounted) {
      return <Navigate to="/" />
    }

    return <WrappedComponent {...props} />
  }

  return AuthWrapperComponent
}

export default AuthWrapper
