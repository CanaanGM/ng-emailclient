import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


interface UserResponse {
  available: boolean
}

interface SignupRes{
  username: string
}
export interface SignupCreds {
  username: string
  password: string
  passwordConfirmation: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  private AUTH_URL: string = 'https://api.angular-email.com/auth/'
  checkUsername(username: string) {
      return this.httpClient.post<UserResponse>(
        `${this.AUTH_URL}username`, 
        {
            username
        }
      )
  }


  signup(creds: SignupCreds){
    const {username,password,passwordConfirmation } = creds;
    return this.httpClient.post<SignupRes>(`${this.AUTH_URL}signup`, 
      creds
    )
  }

}
