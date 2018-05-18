import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, tap, catchError, delay, retry } from 'rxjs/operators';

import { Token } from '../models/token';
import { HelpersService } from './helpers.service';
import { EndpointService } from './endpoint.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  authenticated: boolean;
  validatedToken: boolean = false;
  authChanged: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private helpers: HelpersService,
    private endpoints: EndpointService,
    private router: Router,
  ) {
    console.log('AUTH SERVICE INIT');
    this.authenticated = false;
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  check(): Observable<boolean> {
    console.log('Auth SERVICE CHECK');
    if (!this.getToken()) {
      this.updateAuthenticationState(false);
    } else {
      this.updateAuthenticationState(true);
    }
    return of(this.authenticated).pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          console.log('Auth SERVICE CHECK | NOT AUTHED | REDIRECTING TO LOGIN');
          this.logOut();
          this.sendToLogin();
        }
      }),
    );
  }

  login(username: string, password: string): Observable<Token> {
    return this.http
      .post(this.endpoints.token, this.getParams(username, password), this.httpOptions)
      .pipe(
        tap(() => this.updateAuthenticationState(true)),
        map(response => this.parseTokenData(response)),
        retry(3),
        catchError(this.helpers.handleResponseError),
      );
  }

  logOut() {
    localStorage.clear();
    this.updateAuthenticationState(false);
    this.check();
    this.sendToLogin();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  validateToken(): Observable<boolean> {
    console.log('validateToken INIT');
    if (!this.getToken()) {
      console.log('validateToken TOKEN MISSING');
      this.logOut();
      return of(false);
    }

    const token = this.getToken();
    console.log('validateToken PERFORM SERVER CHECK');
    return this.http
      .post(
        this.endpoints.validateToken,
        JSON.stringify({
          token: token,
        }),
        {
          observe: 'response',
        },
      )
      .pipe(
        map(response => {
          this.validatedToken = true;
          this.updateAuthenticationState(true);
          return true;
        }),
        retry(3),
        catchError(() => {
          this.validatedToken = true;
          this.logOut();
          return of(false);
        }),
      );
  }

  private saveNewToken(token) {
    console.log(token, token.access_token);
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
      client_id: '123456',
      client_secret: '123456',
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

  private sendToLogin(): void {
    console.log('sending to login');
    this.router.navigate(['/login']);
  }

  private sendToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  private updateAuthenticationState(updatedAuthenticationState: boolean): void {
    this.authenticated = updatedAuthenticationState;
    this.authChanged.next(this.authenticated);
  }
}
