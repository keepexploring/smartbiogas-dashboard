import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of, throwError, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message';
import { MessageType } from '../enums/message-type';
import { NavigationHistoryService } from '../services/navigation-history.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.messageService.add(new Message('Please log in again', MessageType.Info));
          this.auth.logOut();
        }

        if (error.status === 404) {
          this.messageService.add(new Message('NOT FOUND', MessageType.Danger));
          this.router.navigate(['404']);
        }

        throwError(error);
        return empty();
      }),
    );
  }
}