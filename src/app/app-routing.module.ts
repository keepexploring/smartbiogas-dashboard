import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlantsComponent } from './components/plants/plants.component';
import { TechniciansComponent } from './components/technicians/technicians.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { TechnicianDetailComponent } from './components/technician-detail/technician-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TechnicianFormComponent } from './components/technician-form/technician-form.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'plants', component: PlantsComponent, canActivate: [AuthGuard] },
  {
    path: 'technicians',
    component: TechniciansComponent,
    canActivate: [AuthGuard],
  },
  { path: 'technicians/create', component: TechnicianFormComponent, canActivate: [AuthGuard] },
  { path: 'technicians/:id', component: TechnicianDetailComponent, canActivate: [AuthGuard] },
  { path: 'technicians/:id/edit', component: TechnicianFormComponent, canActivate: [AuthGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
