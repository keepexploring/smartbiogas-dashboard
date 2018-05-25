import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { map, tap, catchError, delay, retry } from 'rxjs/operators';

import { EndpointService } from './endpoint.service';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { Token } from '../models/token';

@Injectable()
export class AuthService {
  authenticated: boolean;
  validatedToken: boolean = false;
  authChanged: Subject<boolean> = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private endpoints: EndpointService,
    private router: Router,
    private tokenService: TokenService,
  ) {
    this.authenticated = false;
  }

  check(): Observable<boolean> {
    if (!this.tokenService.getCurrentToken()) {
      this.updateAuthenticationState(false);
    } else {
      this.updateAuthenticationState(true);
    }

    return of(this.authenticated).pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.logOut();
          this.sendToLogin();
        }
      }),
    );
  }

  validateToken(): void {
    console.log('validate token called');

    const token = this.tokenService.getCurrentToken();
    if (!token) {
      this.logOut();
    }

    this.tokenService
      .validate()
      .pipe(
        tap(au => this.updateAuthenticationState),
        tap(au => this.check()),
        catchError(err => {
          this.logOut();
          return of(err);
        }),
      )
      .subscribe(isValid => {
        this.updateAuthenticationState(isValid);
      });
  }

  login(username: string, password: string): Observable<Token> {
    return this.tokenService.get(username, password);
  }

  logOut() {
    this.tokenService.unauthorise();
    this.updateAuthenticationState(false);
    this.check();
    this.sendToLogin();
  }

  private sendToLogin(): void {
    this.router.navigate(['/login']);
  }

  private sendToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  updateAuthenticationState(updatedAuthenticationState: boolean): void {
    this.authenticated = updatedAuthenticationState;
    this.authChanged.next(this.authenticated);
  }
}
