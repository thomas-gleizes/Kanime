import { AxiosInstance } from 'axios'

import Api from 'class/Api'
import { ApiService } from 'services/api.service'
import { RegisterDto, SignInDto } from 'dto/authentifications.dto'

class AuthenticationApi extends Api {
  constructor(apiService: AxiosInstance) {
    super(apiService, '/authentification')
  }

  public signIn(payload: SignInDto) {
    return this.post<SignInResponse>('/sign-in', payload)
  }

  public register(payload: RegisterDto) {
    return this.post<RegisterResponse>('/register', payload)
  }

  public me() {
    return this.get<RefreshUserResponse>('/me')
  }

  public signOut() {
    return this.get('/sign-out')
  }

  public forgotPassword(payload: any) {
    return this.post('/forgot-password', payload)
  }

  public resetPassword(payload: any) {
    return this.post('/reset-password', payload)
  }
}

export default new AuthenticationApi(ApiService)
