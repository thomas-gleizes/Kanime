import isBrowser from 'utils/isBrowser';

class LocalStorageService {
  private static readonly USER: string = 'KANIME_USER';
  private static readonly TOKEN: string = 'KANIME_TOKEN';
  private static readonly THEME: string = 'KANIME_THEME';

  private static isBrowser(): boolean {
    return isBrowser();
  }

  static saveUser(user: User): void {
    if (this.isBrowser())
      localStorage.setItem(LocalStorageService.USER, JSON.stringify(user));
  }

  static saveToken(token: string): void {
    if (this.isBrowser()) localStorage.setItem(LocalStorageService.TOKEN, token);
  }

  static getUser(): User {
    if (this.isBrowser())
      return JSON.parse(localStorage.getItem(LocalStorageService.USER));
    else return null;
  }

  static getToken(): string {
    if (this.isBrowser()) return localStorage.getItem(LocalStorageService.TOKEN);
    return null;
  }

  static clearUser(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(LocalStorageService.USER);
      localStorage.removeItem(LocalStorageService.TOKEN);
    }
  }

  static getTheme(): TailwindTheme {
    if (this.isBrowser()) {
      const theme = localStorage.getItem(
        LocalStorageService.THEME
      ) as TailwindTheme | null;

      return theme || 'light';
    }

    return 'light';
  }

  static setTheme(theme: TailwindTheme) {
    if (this.isBrowser()) localStorage.setItem(LocalStorageService.THEME, theme);
  }
}

export default LocalStorageService;
