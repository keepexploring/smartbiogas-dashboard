import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantsComponent } from './components/plants/plants.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PlantsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantsRoutingModule {}
