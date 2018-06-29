import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechnicianFormComponent } from './components/technician-form/technician-form.component';
import { TechnicianDetailComponent } from './components/technician-detail/technician-detail.component';
import { TechniciansTableComponent } from './components/technicians-table/technicians-table.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TechniciansTableComponent,
    canActivate: [AuthGuard],
  },
  { path: 'create', component: TechnicianFormComponent, canActivate: [AuthGuard] },
  { path: ':id', component: TechnicianDetailComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: TechnicianFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechniciansRoutingModule {}
