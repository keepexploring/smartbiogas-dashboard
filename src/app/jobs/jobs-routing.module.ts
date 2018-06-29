import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobsTableComponent } from './components/jobs-table/jobs-table.component';

const routes: Routes = [
  {
    path: '',
    component: JobsTableComponent,
    canActivate: [AuthGuard],
  },
  { path: ':id', component: JobDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobsRoutingModule {}
