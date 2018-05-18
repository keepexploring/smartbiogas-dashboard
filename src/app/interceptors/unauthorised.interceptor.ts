import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class UnauthorisedInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log('UnauthorisedInterceptor');
    return next.handle(request).pipe(
      tap(
        event => {
          // console.log('ERRRRRRRR', event);
          if (event instanceof HttpErrorResponse) {
            // console.log('ERRRRRRRR2', event);
          }
        },
        // (event: HttpEvent<any>) => {
        //   console.log('Intercept', event);
        //   if (event instanceof HttpResponse) {
        //     console.log(event);
        //     // do stuff (Not necessary)
        //   }
        // },
        // (err: any) => {
        //   console.log('Intercept');
        //   if (err instanceof HttpErrorResponse) {
        //     if (err.status === 401) {
        //       this.auth.logOut();
        //       this.router.navigate(['/login']);
        //     }
        //   }
        // },
      ),
      tap(event => {
        // console.log('second tap', event);
      }),
    );
  }
}
