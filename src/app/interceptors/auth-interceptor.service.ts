import { Observable, throwError } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.currentUser.token;

   if (token) {
     // If we have a token, we set it to the header
     request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
     });
  }

  return next.handle(request).pipe(
  	catchError((err) => {
   	 if (err instanceof HttpErrorResponse) {
       	 if (err.status === 401) {
       	 // redirect user to the logout page
     	}
    }
      return throwError(err);
    })
   );
  }
}
