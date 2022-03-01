import { User } from '@types';

class LocalStorageService {
  private static readonly USER: string = 'STORAGE_USER';
  private static readonly TOKEN: string = 'STORAGE_TOKEN';

  private static isBrowser(): boolean {
    return process.browser;
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
}

export default LocalStorageService;
