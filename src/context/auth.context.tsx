import React, { createContext, useCallback, useMemo, useState } from 'react'

import { authenticationApi } from 'api'
import { useContextFactory } from 'hooks'
import LocalStorageService from 'services/localStorage.service'

interface Props extends ContextProviderProps {
  initialUser: User
}

const AuthContext = createContext<UserContextValues>({} as any)

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useUserContext = useContextFactory<UserContextValues>(AuthContext)

const AuthContextProvider: Component<Props> = ({ children, initialUser }) => {
  const [user, setUser] = useState<Nullable<User>>(initialUser || LocalStorageService.getUser())
  const [isLogin, setIsLogin] = useState<boolean>(!!user)

  const signIn = useCallback((user: User): void => {
    setUser(user)
    setIsLogin(true)

    LocalStorageService.saveUser(user)
  }, [])

  const signOut = useCallback((fetching: boolean = true): void => {
    fetching && authenticationApi.signOut()

    setIsLogin(false)
    setUser(null)

    LocalStorageService.clearUser()
  }, [])

  const value = useMemo<UserAuthenticatedContextValues | UserUnauthenticatedContextValues>(() => {
    const actions = { signOut, signIn }

    if (isLogin)
      return {
        isLogin: true,
        user: user as User,
        ...actions
      }
    else
      return {
        isLogin: false,
        user: null,
        ...actions
      }
  }, [isLogin, user, signOut, signIn])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
