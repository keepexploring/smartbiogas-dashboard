import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavigationHistoryService } from '../../../core/services/navigation-history.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loading = false;
  hasError = false;
  errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private navigationHistory: NavigationHistoryService,
  ) {}

  ngOnInit() {
    this.navigationHistory.clear();
  }

  clearErrors() {
    if (this.hasError || this.errorMessage != '') {
      this.hasError = false;
      this.errorMessage = '';
    }
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe(
      data => {
        this.authService.updateAuthenticationState(!!data);
        this.loading = false;
        this.username = '';
        this.password = '';
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.loading = false;
        this.hasError = true;
        this.username = '';
        this.password = '';
        this.errorMessage = error;
      },
      () => {
        this.loading = false;
      },
    );
  }
}
