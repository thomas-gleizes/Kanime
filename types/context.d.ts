// general

interface ContextProviderProps {
  children: ReactNode
}

// auth context

interface UserBaseContextValues {
  signIn: (user: User) => void
  signOut: () => void
}

interface UserUnauthenticatedContextValues extends UserBaseContextValues {
  isLogin: false
  user: null
}

interface UserAuthenticatedContextValues extends UserBaseContextValues {
  isLogin: true
  user: User
}

declare type UserContextValues =
  | UserUnauthenticatedContextValues
  | UserAuthenticatedContextValues

// dialog context

interface DialogContextValues {
  dialogs: Dialog[]
  addDialog: (dialog: Dialog) => void
  closeDialog: Function
}

// layout context

interface LayoutContextValues {
  activeTransparentState: State<boolean>
  scrollPercent: number
  scrollHeight: number
  theme: TailwindTheme
  toggleTheme: () => void
  header: {
    hiddenHeader: boolean
    hideHeader: () => void
    showHeader: () => void
  }
  isInactive: boolean
  globalLoadingPercent: number
}
