import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('TokenInterceptor');

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      },
    });

    // TODO:
    //  The interceptor is not catching the http error.
    //  Only happens on refresh
    //  It should exit, log out and redirect to login if the token is not valid, i.e. the response is a 401

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        console.log('TAPPED', event);
      }),
      map((event: HttpEvent<any>) => {
        console.log('result', event);
        return event;
      }),
      catchError((event: HttpEvent<any>) => {
        console.log('ERRRRRRRRR', event, event.status);

        if (event.status === 401) {
          this.auth.logOut();
        }

        return of(event);
      }),
    );
  }
}
