import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.check();
  }
}
