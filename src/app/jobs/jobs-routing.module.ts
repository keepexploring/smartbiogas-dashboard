import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './components/jobs/jobs.component';
import { AuthGuard } from '../guards/auth.guard';
import { JobDetailComponent } from './components/job-detail/job-detail.component';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
    canActivate: [AuthGuard],
  },
  // { path: 'create', component: Job, canActivate: [AuthGuard] },
  { path: ':id', component: JobDetailComponent, canActivate: [AuthGuard] },
  // { path: 'edit/:id', component: JobE, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
