import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantsComponent } from './components/plants/plants.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { MainPlantsTableComponent } from './components/main-plants-table/main-plants-table.component';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PlantsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MainPlantsTableComponent,
        canActivate: [AuthGuard],
      },
      {
        path: ':id',
        component: PlantDetailComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantsRoutingModule {}
