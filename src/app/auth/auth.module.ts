import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { IconsModule } from '../icons/icons.module';
import { PasswordService } from './services/password.service';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    IconsModule,
    FormsModule,
  ],
  declarations: [LoginComponent, ForgotPasswordComponent, ResetPasswordComponent],
  providers: [AuthService, TokenService, PasswordService],
})
export class AuthModule {}
