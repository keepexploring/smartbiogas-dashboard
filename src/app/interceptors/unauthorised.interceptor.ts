
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';


import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router';

@Injectable()
export class UnauthorisedInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff (Not necessary)
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.auth.logOut();
          this.router.navigate(['/login']);
        }
      }
    }));
  }

}
