import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { NgxPaginationModule } from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';

import { IconsModule } from './modules/icons.module';

import { AuthService } from './services/auth.service';
import { HelpersService } from './services/helpers.service';
import { DashboardService } from './services/dashboard.service';
import { PlantsService } from './services/plants.service';
import { TechniciansService } from './services/technicians.service';
import { JobsService } from './services/jobs.service';
import { DataService } from './services/data.service';
import { EndpointService } from './services/endpoint.service';

import { AppComponent } from './components/app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlantsComponent } from './components/plants/plants.component';
import { TechniciansComponent } from './components/technicians/technicians.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TechnicianDetailComponent } from './components/technician-detail/technician-detail.component';
import { JobsTableComponent } from './components/jobs-table/jobs-table.component';
import { TechniciansTableComponent } from './components/technicians-table/technicians-table.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobStatusComponent } from './components/job-status/job-status.component';
import { TechnicianStatusComponent } from './components/technician-status/technician-status.component';
import { PlantsTableComponent } from './components/plants-table/plants-table.component';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';
import { PlantStatusComponent } from './components/plant-status/plant-status.component';
import { JobDetailModalComponent } from './components/job-detail-modal/job-detail-modal.component';
import { PlantsMapComponent } from './components/plants-map/plants-map.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

import { httpInterceptorProviders } from './interceptors';

import { environment } from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PlantsComponent,
    TechniciansComponent,
    JobsComponent,
    LoginComponent,
    HeaderComponent,
    LoadingComponent,
    TechnicianDetailComponent,
    JobsTableComponent,
    TechniciansTableComponent,
    JobDetailComponent,
    JobStatusComponent,
    TechnicianStatusComponent,
    PlantsTableComponent,
    PlantDetailComponent,
    PlantStatusComponent,
    JobDetailModalComponent,
    PlantsMapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IconsModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey
    })
  ],
  providers: [
    httpInterceptorProviders,
    AuthService,
    HelpersService,
    DashboardService,
    PlantsService,
    TechniciansService,
    JobsService,
    DataService,
    AuthGuard,
    LoginGuard,
    EndpointService,
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
