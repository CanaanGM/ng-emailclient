import { Component } from '@angular/core';
import {AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService, SignupCreds } from '../auth.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

/**
 *
 */
constructor(
  private matchPasswords: MatchPassword,
  private uniqueUsername: UniqueUsername,
  private authService : AuthService
  
  ) {
  
}

  authForm = new FormGroup({
    username : new FormControl(
      '',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^[a-z0-9]+$/)
    ],
    [
      this.uniqueUsername.validate as AsyncValidatorFn
    ]
    ),
    password : new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation : new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
  }, {
    validators: [this.matchPasswords.validate]
  });


  onSubmit(){
    if( this.authForm.invalid) return;
    
    this.authService.signup(this.authForm.value as SignupCreds)
      .subscribe({
        next : (res) => {

        },
        complete() {
            
        },
        error :(err) => {
            if (!err.status) {
              this.authForm.setErrors({ noConnection: true })
            }
            else {
              this.authForm.setErrors({ unknownError: true })
            }
        },
      })
  }
}
