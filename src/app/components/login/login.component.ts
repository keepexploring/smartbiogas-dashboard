import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loading = false;
  hasError = false;
  errorMessage: string;

  constructor(private authService: AuthService, private dataService: DataService, private router: Router) { }

  ngOnInit() { }

  clearErrors() {
    if(this.hasError || this.errorMessage != '') {
      this.hasError = false;
      this.errorMessage = '';
    }
  }

  onSubmit() {
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe(data => {
      this.loading = false;
      this.dataService.userAuthenticated(true);
      this.username = '';
      this.password = '';
      this.router.navigate(['/dashboard']);
    },
    error => {
      console.log(error);
      console.log('got error');
      this.loading = false;
      this.hasError = true;
      this.username = '';
      this.password = '';
      this.errorMessage = error;
    });
  }

}
