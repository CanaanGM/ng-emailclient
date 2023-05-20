import { Injectable } from "@angular/core";
import { AsyncValidator, FormControl } from "@angular/forms";
import { catchError, map, of } from "rxjs";
import { AuthService } from "../auth.service";


@Injectable({providedIn:'root'})
export class UniqueUsername implements AsyncValidator {

    constructor(private authService: AuthService) {}

    validate =  (control: FormControl) => {
        const {value}= control;
        
        return this.authService.checkUsername(value)
        .pipe(
            map(val =>  null),

            catchError(err =>{
                console.error(err)
                if (err.error.username)
                    return of({ nonUniqueUsername: true})    
                else
                    return of({noConnection: true})
            })
        )
    }
}
