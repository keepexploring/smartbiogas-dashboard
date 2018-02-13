import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlantsComponent } from './components/plants/plants.component';
import { TechniciansComponent } from './components/technicians/technicians.component';
import { JobsComponent } from './components/jobs/jobs.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'plants', component: PlantsComponent },
  { path: 'technicians', component: TechniciansComponent },
  { path: 'jobs', component: JobsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
