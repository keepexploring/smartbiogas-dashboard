import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'technicians',
    loadChildren: 'app/technicians/technicians.module#TechniciansModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'plants',
    loadChildren: 'app/plants/plants.module#PlantsModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'jobs',
    loadChildren: 'app/jobs/jobs.module#JobsModule',
    canActivate: [AuthGuard],
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
