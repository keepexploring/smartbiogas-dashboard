import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlantsComponent } from './components/plants/plants.component';
import { TechniciansComponent } from './components/technicians/technicians.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'plants', component: PlantsComponent, canActivate: [AuthGuard] },
  { path: 'technicians', component: TechniciansComponent, canActivate: [AuthGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
