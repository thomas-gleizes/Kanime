import isBrowser from 'utils/isBrowser'

class LocalStorageService {
  private static readonly USER_KEY: string = 'KANIME_USER'
  private static readonly TOKEN_KEY: string = 'KANIME_TOKEN'
  private static readonly THEME_KEY: string = 'KANIME_THEME'

  private static isBrowser(): boolean {
    return isBrowser()
  }

  static saveUser(user: User): void {
    if (this.isBrowser())
      localStorage.setItem(LocalStorageService.USER_KEY, JSON.stringify(user))
  }

  static saveToken(token: string): void {
    if (this.isBrowser()) localStorage.setItem(LocalStorageService.TOKEN_KEY, token)
  }

  static getUser(): Nullable<User> {
    if (this.isBrowser()) {
      const str = localStorage.getItem(LocalStorageService.USER_KEY)
      if (str) return JSON.parse(str) as User
    }

    return null
  }

  static getToken(): Nullable<string> {
    if (this.isBrowser()) {
      return localStorage.getItem(LocalStorageService.TOKEN_KEY)
    }
    return null
  }

  static clearUser(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(LocalStorageService.USER_KEY)
      localStorage.removeItem(LocalStorageService.TOKEN_KEY)
    }
  }

  static getTheme(): TailwindTheme {
    if (this.isBrowser()) {
      const theme = localStorage.getItem(
        LocalStorageService.THEME_KEY
      ) as TailwindTheme | null

      return theme || 'light'
    }

    return 'light'
  }

  static setTheme(theme: TailwindTheme) {
    if (this.isBrowser()) localStorage.setItem(LocalStorageService.THEME_KEY, theme)
  }
}

export default LocalStorageService
