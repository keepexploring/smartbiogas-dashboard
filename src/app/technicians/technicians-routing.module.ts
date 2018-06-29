import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechnicianDetailComponent } from './components/technician-detail/technician-detail.component';
import { TechniciansTableComponent } from './components/technicians-table/technicians-table.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { CreateTechnicianComponent } from './components/create-technician/create-technician.component';
import { EditTechnicianComponent } from './components/edit-technician/edit-technician.component';

const routes: Routes = [
  {
    path: '',
    component: TechniciansTableComponent,
    canActivate: [AuthGuard],
  },
  { path: 'create', component: CreateTechnicianComponent, canActivate: [AuthGuard] },
  { path: ':id', component: TechnicianDetailComponent, canActivate: [AuthGuard] },
  { path: ':id/edit', component: EditTechnicianComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TechniciansRoutingModule {}
