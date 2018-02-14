import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlantsComponent } from './components/plants/plants.component';
import { TechniciansComponent } from './components/technicians/technicians.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { HelpersService } from './services/helpers.service';
import { DashboardService } from './services/dashboard.service';
import { PlantsService } from './services/plants.service';
import { TechniciansService } from './services/technicians.service';
import { JobsService } from './services/jobs.service';
import { LoadingComponent } from './components/loading/loading.component';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { DataService } from './services/data.service';
import { IconsModule } from './modules/icons.module';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { EndpointService } from './services/endpoint.service';
import { TechnicianDetailComponent } from './components/technician-detail/technician-detail.component';
import { UnauthorisedInterceptor } from './interceptors/unauthorised.interceptor';
import { DatePipe } from '@angular/common';
import { JobsTableComponent } from './components/jobs-table/jobs-table.component';
import { TechniciansTableComponent } from './components/technicians-table/technicians-table.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobStatusComponent } from './components/job-status/job-status.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IconsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorisedInterceptor,
      multi: true
    },
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
