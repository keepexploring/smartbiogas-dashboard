import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { Token } from '../models/token';

@Injectable()
export class AuthService {
  authenticated: boolean;
  validatedToken: boolean = false;
  authChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private tokenService: TokenService) {
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
    const token = this.tokenService.getCurrentToken();
    if (!token) {
      this.logOut();
    }

    this.tokenService
      .validate()
      .pipe(
        tap(() => this.updateAuthenticationState),
        tap(() => this.check()),
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

  logOut(sendToLogin: boolean = true) {
    this.tokenService.unauthorise();
    this.updateAuthenticationState(false);
    this.check();
    if (sendToLogin) {
      this.sendToLogin();
    }
  }

  private sendToLogin(): void {
    this.router.navigate(['/login']);
  }

  updateAuthenticationState(updatedAuthenticationState: boolean): void {
    this.authenticated = updatedAuthenticationState;
    this.authChanged.next(this.authenticated);
  }
}
