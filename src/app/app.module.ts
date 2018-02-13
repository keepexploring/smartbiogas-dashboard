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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IconsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthService,
    HelpersService,
    DashboardService,
    PlantsService,
    TechniciansService,
    JobsService,
    DataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
