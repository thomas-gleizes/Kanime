import { User } from '@types';

class LocalStorage {
  private static readonly USER: string = 'STORAGE_USER';

  private static isBrowser(): boolean {
    return process.browser;
  }

  static saveUser(user: User): void {
    if (this.isBrowser()) localStorage.setItem(LocalStorage.USER, JSON.stringify(user));
  }

  static fetchUser(): User {
    if (this.isBrowser()) return JSON.parse(localStorage.getItem(LocalStorage.USER));
    else return null;
  }

  static removeUser(): void {
    if (this.isBrowser()) localStorage.removeItem(LocalStorage.USER);
  }
}

export default LocalStorage;
