import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Email } from '../inbox/email';

interface SignedinRes {
  authenticated: boolean
  username: string
}

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

export interface SigninCreds {
  username: string
  password: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username = ""; 
  constructor(private httpClient: HttpClient) { }

  signedin$= new BehaviorSubject<boolean | null>(null);

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
    return this.httpClient.post<SignupRes>(`${this.AUTH_URL}signup`, 
      creds
    ).pipe(
      tap(({username}) =>{
         this.signedin$.next(true)
         this.username = username
        })
    )
  }

  signout(){
    return this.httpClient.post(`${this.AUTH_URL}signout`, {})
    .pipe(
      tap(() => {
        this.signedin$.next(false)
      })
    )
  }

  signin(creds:SigninCreds ){
    return this.httpClient.post<SignedinRes>(`${this.AUTH_URL}signin`, creds)
      .pipe(
        tap(({username}) => {
          this.signedin$.next(true)
          this.username = username
        })
      )
  }

  checkAuth(){
    return this.httpClient
      .get<SignedinRes>(`${this.AUTH_URL}signedin`,{withCredentials:true})
      .pipe
        (
          tap(({authenticated, username}) => {
            this.signedin$.next(authenticated);
            this.username = username
          })
        )
  }



}
