import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, AsyncSubject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  private cache: { [name: string]: AsyncSubject<HttpEvent<any>> } = {};

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.get('x-requested-with')) {
      return next.handle(request);
    }

    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cachedResponse = this.cache[request.urlWithParams] || null;
    if (cachedResponse) {
      return cachedResponse.pipe(delay(0));
    }

    const subject = (this.cache[request.urlWithParams] = new AsyncSubject<HttpEvent<any>>());
    next
      .handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            subject.next(event);
            subject.complete();
          }
        }),
      )
      .subscribe(); // must subscribe to actually kick off request!
    return subject;
  }
}
