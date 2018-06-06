import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  passwordShown: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      code: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log(this.password);
  }

  showPassword() {
    if (this.passwordShown == true) {
      this.passwordShown = false;
    } else {
      this.passwordShown = true;
    }
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get code() {
    return this.resetPasswordForm.get('code');
  }
}
