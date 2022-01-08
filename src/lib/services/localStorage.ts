import { User } from '@types';

class LocalStorage {
  private static readonly USER: string = 'STORAGE_USER';
  private static readonly TOKEN: string = 'STORAGE_TOKEN';

  private static isBrowser(): boolean {
    return process.browser;
  }

  static saveUser(user: User): void {
    if (this.isBrowser()) localStorage.setItem(LocalStorage.USER, JSON.stringify(user));
  }

  static saveToken(token: string): void {
    if (this.isBrowser()) localStorage.setItem(LocalStorage.TOKEN, token);
  }

  static getUser(): User {
    if (this.isBrowser()) return JSON.parse(localStorage.getItem(LocalStorage.USER));
    else return null;
  }

  static getToken(): string {
    if (this.isBrowser()) return localStorage.getItem(LocalStorage.TOKEN);
    return null;
  }

  static clearUser(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(LocalStorage.USER);
      localStorage.removeItem(LocalStorage.TOKEN);
    }
  }
}

export default LocalStorage;
