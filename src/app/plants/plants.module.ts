import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantsRoutingModule } from './plants-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PlantsService } from './services/plants.service';
import { PlantsMapComponent } from './components/plants-map/plants-map.component';
import { PlantsComponent } from './components/plants/plants.component';
import { PlantsTableComponent } from './components/plants-table/plants-table.component';
import { PlantStatusComponent } from './components/plant-status/plant-status.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../environments/environment';
import { PaginationModule } from '../pagination/pagination.module';
import { IconsModule } from '../icons/icons.module';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';
import { MainPlantsTableComponent } from './components/main-plants-table/main-plants-table.component';
import { JobsModule } from '../jobs/jobs.module';
import { PlantJobsComponent } from './components/plant-jobs/plant-jobs.component';

@NgModule({
  imports: [
    CommonModule,
    PlantsRoutingModule,
    SharedModule,
    PaginationModule,
    IconsModule,
    JobsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey,
    }),
  ],
  declarations: [
    PlantsMapComponent,
    PlantsComponent,
    PlantsTableComponent,
    PlantStatusComponent,
    PlantDetailComponent,
    MainPlantsTableComponent,
    PlantJobsComponent,
  ],
  providers: [PlantsService],
})
export class PlantsModule {}
