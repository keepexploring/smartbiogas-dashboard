import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobsTableComponent } from './components/jobs-table/jobs-table.component';
import { MainJobTableComponent } from './components/main-job-table/main-job-table.component';

const routes: Routes = [
  {
    path: '',
    component: JobsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MainJobTableComponent, canActivate: [AuthGuard] },
      { path: ':id', component: JobDetailComponent, canActivate: [AuthGuard] },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
