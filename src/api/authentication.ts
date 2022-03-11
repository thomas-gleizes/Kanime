import { AxiosInstance } from 'axios';

import Api from 'class/Api';
import { ApiService } from 'services/api.service';

class AuthenticationApi extends Api {
  constructor(apiService: AxiosInstance) {
    super(apiService, '/authentication');
  }

  public signIn(payload: any) {
    return this.post<SignInResponse>('/sign-in', payload);
  }

  public register(payload: any) {
    return this.post<RegisterResponse>('/register', payload);
  }

  public logout(payload: any) {
    return this.post('/logout', payload);
  }

  public forgotPassword(payload: any) {
    return this.post('/forgot-password', payload);
  }

  public resetPassword(payload: any) {
    return this.post('/reset-password', payload);
  }
}

export default new AuthenticationApi(ApiService);