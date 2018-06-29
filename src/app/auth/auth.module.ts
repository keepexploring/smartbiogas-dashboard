import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, AuthRoutingModule, SharedModule, ReactiveFormsModule, FormsModule],
  declarations: [LoginComponent],
  providers: [AuthService, TokenService],
})
export class AuthModule {}
