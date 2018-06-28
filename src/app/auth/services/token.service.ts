import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import { Token } from '../models/token';
import { EndpointService } from '../../core/services/endpoint.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private http: HttpClient,
    private endpoints: EndpointService,
    private router: Router,
  ) {}

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  get(username: string, password: string): Observable<Token> {
    return this.http
      .post(this.endpoints.token, this.getParams(username, password), this.httpOptions)
      .pipe(
        map(response => this.parseTokenData(response)),
        retry(3),
        catchError(err => {
          this.handleUnauthorisedError(err);
          return of(err);
        }),
      );
  }

  validate(): Observable<boolean> {
    return this.http
      .post(
        this.endpoints.validateToken,
        JSON.stringify({
          token: this.getCurrentToken(),
        }),
        {
          observe: 'response',
        },
      )
      .pipe(
        map(() => {
          return true;
        }),
        retry(3),
        catchError(err => {
          this.handleUnauthorisedError(err);
          return of(false);
        }),
      );
  }

  getCurrentToken(): string {
    return localStorage.getItem('token');
  }

  unauthorise(): void {
    localStorage.clear();
  }

  private saveNewToken(token): void {
    localStorage.clear();
    localStorage.setItem('token', token.access_token);
    localStorage.setItem('token_type', token.token_type);
    localStorage.setItem('expires_in', token.expires_in);
    localStorage.setItem('refresh_token', token.refresh_token);
    localStorage.setItem('scope', token.scope);
  }

  private getParams(username: string, password: string) {
    return JSON.stringify({
      username: username,
      password: password,
      grant_type: 'password',
      client_id: environment.apClientId,
      client_secret: environment.apClientSecret,
    });
  }

  private parseTokenData(response: any): Token {
    var token: Token = new Token();
    token.access_token = response.access_token;
    token.token_type = response.token_type;
    token.expires_in = response.expires_in;
    token.refresh_token = response.refresh_token;
    token.scope = response.scope;
    this.saveNewToken(token);
    return token;
  }

  handleUnauthorisedError(error: Response | any) {
    if (error && error.status === 401) {
      this.unauthorise();
      this.router.navigate(['/login']);
    }
    return throwError(error);
  }
}
