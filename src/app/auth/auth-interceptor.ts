import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedREq = req.clone({
            withCredentials: true
        })
        return next.handle(modifiedREq)
            .pipe(
                tap(val =>{
                
                    if (val.type === HttpEventType.Sent)
                        console.log("sending")
                    if (val.type === HttpEventType.Response)
                    console.log("from api", val)
                
      })
    );
    }
}
