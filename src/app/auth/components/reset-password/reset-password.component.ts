import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { Message } from '../../../shared/models/message';
import { HttpResponse } from '@angular/common/http';
import { PasswordService } from '../../services/password.service';
import { MessageService } from '../../../core/services/message.service';
import { MessageType } from '../../../shared/enums/message-type';

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
    private messageService: MessageService,
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
      this.passwordService.resetPassword(this.password.value).subscribe(
        success => {
          this.messageService.add(
            new Message('Password has been successfully changed', MessageType.Success),
          );
          this.router.navigate(['/login']);
        },
        error => {
          this.messageService.add(new Message('There was an error', MessageType.Danger));
        },
      );
    }
  }

  onSubmitCode() {
    if (this.codeForm.valid) {
      this.passwordService.validateCode(this.code.value).subscribe(
        success => {
          this.isCodeValid = true;
        },
        error => {},
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
