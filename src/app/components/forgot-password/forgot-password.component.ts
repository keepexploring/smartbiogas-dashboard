import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  private currentField: 'email' | 'phone';
  emailValidators = [Validators.required, Validators.minLength(4), Validators.email];
  phoneValidators = [
    Validators.required,
    Validators.minLength(4),
    Validators.pattern('^[+d][0-9]{0,14}$'),
  ];

  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', this.emailValidators],
      phoneNumber: [''],
    });

    this.clearFeilds();
  }

  onSubmit() {
    console.log();
    this.router.navigate(['/reset-password']);
  }

  private clearFeilds() {
    this.email.valueChanges.subscribe(changes =>
      this.focusOnFeild(this.email, this.phoneNumber, this.emailValidators),
    );
    this.phoneNumber.valueChanges.subscribe(changes =>
      this.focusOnFeild(this.phoneNumber, this.email, this.phoneValidators),
    );
  }

  focusOnFeild(toFocus: AbstractControl, toClear: AbstractControl, validators: any[]) {
    if (toClear.value !== '') {
      toClear.setValue('');
      toFocus.setValidators(validators);
      toClear.setValidators(null);
      toFocus.updateValueAndValidity();
      toClear.updateValueAndValidity();
    }
  }

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  get phoneNumber() {
    return this.forgotPasswordForm.get('phoneNumber');
  }
}
