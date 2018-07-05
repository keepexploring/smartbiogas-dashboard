import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { PasswordService } from '../../services/password.service';
import * as constants from '../../../shared/constants';
import { MessageService } from '../../../core/services/message.service';
import { Message } from '../../../shared/models/message';
import { MessageType } from '../../../shared/enums/message-type';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  emailForm: FormGroup;
  phoneNumberForm: FormGroup;
  loading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: PasswordService,
    private messageService: MessageService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.logOut(false);

    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
    });

    this.phoneNumberForm = this.formBuilder.group({
      phoneNumber: [
        '',
        [Validators.required, Validators.minLength(4), Validators.pattern(constants.phoneRegex)],
      ],
    });

    const sub = this.service.loading.subscribe(loading => {
      this.loading = loading;
    });
    this.subscriptions.push(sub);
  }

  onSubmit(type: 'email' | 'phone') {
    if (type !== 'email' && type !== 'phone') {
      this.messageService.add(new Message('Error, please try again later', MessageType.Danger));
      this.router.navigate(['/login']);
    }

    if (type == 'email') {
      this.messageService.add(
        new Message(
          'If your email exists in the system you will soon receive a message',
          MessageType.Info,
        ),
      );
      this.service.getResetCodeByEmail(this.email.value);
    } else if (type == 'phone') {
      this.messageService.add(
        new Message(
          'If your phone number exists in the system you will soon receive a message',
          MessageType.Info,
        ),
      );
      this.service.getResetCodeByPhone(this.phoneNumber.value);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  get email() {
    return this.emailForm.get('email');
  }

  get phoneNumber() {
    return this.phoneNumberForm.get('phoneNumber');
  }
}
