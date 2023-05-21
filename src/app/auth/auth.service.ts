import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

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
      tap(() => this.signedin$.next(true) )
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
    return this.httpClient.post<SigninCreds>(`${this.AUTH_URL}signin`, creds)
      .pipe(
        tap((res) => {
          console.log(res)
          this.signedin$.next(true)
        })
      )
  }

  checkAuth(){
    return this.httpClient
      .get<SignedinRes>(`${this.AUTH_URL}signedin`,{withCredentials:true})
      .pipe
        (
          tap(({authenticated}) => {
            this.signedin$.next(authenticated);
          })
        )
  }
}
