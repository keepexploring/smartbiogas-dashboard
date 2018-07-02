import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { PasswordService } from '../../services/password.service';
import { MessageService } from '../../../core/services/message.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  codeForm: FormGroup;
  passwordShown: boolean = true;
  loading: boolean = false;

  isCodeValid: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private passwordService: PasswordService,
  ) {}

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.codeForm = this.formBuilder.group({
      code: ['', [Validators.required]],
    });

    this.passwordService.loading.subscribe(loading => {
      this.loading = loading;
    });
  }

  onSubmitPassword() {
    if (this.resetPasswordForm.valid) {
      // this.passwordService.validateCode(this.code.value);
      console.log(this.password.value);
    }
  }
  onSubmitCode() {
    console.log(this.codeForm.valid);
    if (this.codeForm.valid) {
      console.log(this.code.value);
      this.passwordService.validateCode(this.code.value).subscribe(
        success => {
          console.log('success', success);
          this.isCodeValid = true;
        },
        error => {
          console.log('ERR!!', error);
        },
      );
    }
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
    return this.codeForm.get('code');
  }
}
