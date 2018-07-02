import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass'],
})
export class ForgotPasswordComponent implements OnInit {
  emailForm: FormGroup;
  phoneNumberForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
    });

    this.phoneNumberForm = this.formBuilder.group({
      phoneNumber: [
        '',
        [Validators.required, Validators.minLength(4), Validators.pattern('^[+d][0-9]{0,14}$')],
      ],
    });
  }

  onSubmit() {
    this.router.navigate(['/reset-password']);
  }

  clearFeild(toClear: AbstractControl) {
    if (toClear.value !== '') {
      toClear.setValue('');
    }
  }

  get email() {
    return this.emailForm.get('email');
  }

  get phoneNumber() {
    return this.phoneNumberForm.get('phoneNumber');
  }
}
