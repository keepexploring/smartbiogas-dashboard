import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EndpointService } from '../../core/services/endpoint.service';
import { map, catchError, tap } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../../core/services/message.service';
import { Message } from '../../shared/models/message';
import { MessageType } from '../../shared/enums/message-type';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private baseUrl = EndpointService.baseUri + 'pass';
  private token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService,
  ) {}

  getResetCodeByPhone(mobile: string) {
    this.getResetCode({ mobile: mobile });
  }

  getResetCodeByEmail(email: string) {
    this.getResetCode({ email: email });
  }

  private getResetCode(body: any) {
    console.log(body);
    this.loading.next(true);
    return this.http
      .post(this.baseUrl + '/get_reset_code/', body, { observe: 'response' })
      .pipe(
        catchError(err => {
          console.log('ERRRR!!', err);
          return of(err);
        }),
      )
      .subscribe(
        success => {
          console.log('success', success);
          this.router.navigate(['/reset-password']);
        },
        error => {
          console.log('ERR!!', error);
        },
        () => {
          this.loading.next(false);
        },
      );
  }

  validateCode(code: string) {
    this.loading.next(true);
    return this.http
      .post(this.baseUrl + '/validate_code/', { reset_code: code }, { observe: 'response' })
      .pipe(
        map((response: HttpResponse<any>) => {
          this.token = response.body.token;
          return;
        }),
        tap(() => {
          this.loading.next(false);
        }),
        catchError(err => {
          console.log('ERRRR!!', err);
          return of(err);
        }),
      );
  }

  resetPassword(password: string) {
    this.loading.next(true);
    return this.http
      .post(
        this.baseUrl + '/reset_password/',
        { password, token: this.token },
        { observe: 'response' },
      )
      .pipe(
        tap(() => {
          this.token = null;
          this.loading.next(false);
        }),
        catchError(err => {
          console.log('ERRRR!!', err);
          return of(err);
        }),
      );
  }
}
