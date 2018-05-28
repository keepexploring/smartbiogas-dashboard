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

@Injectable()
export class UnauthorisedInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private messageService: MessageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 401) {
          this.messageService.add(new Message('Please log in again', MessageType.Info));
          this.auth.logOut();
          return empty();
        } else {
          throwError(error);
          return empty();
        }
      }),
    );
  }
}
