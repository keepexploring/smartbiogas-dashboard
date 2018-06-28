import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { PaginationModule } from './pagination/pagination.module';

import { AgmCoreModule } from '@agm/core';
import { IconsModule } from './icons/icons.module';
import { AuthService } from './auth/services/auth.service';
import { DashboardService } from './services/dashboard.service';
import { PlantsService } from './services/plants.service';
import { DataService } from './services/data.service';
import { AppComponent } from './components/app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PlantsComponent } from './components/plants/plants.component';
import { LoginComponent } from './components/login/login.component';

import { PlantsTableComponent } from './components/plants-table/plants-table.component';
import { PlantDetailComponent } from './components/plant-detail/plant-detail.component';
import { PlantStatusComponent } from './components/plant-status/plant-status.component';
import { PlantsMapComponent } from './components/plants-map/plants-map.component';
import { AuthGuard } from './guards/auth.guard';
import { environment } from '../environments/environment';
import { NavSidebarComponent } from './components/nav-sidebar/nav-sidebar.component';
import { NavTopComponent } from './components/nav-top/nav-top.component';
import { ServiceWorkerModule } from '@angular/service-worker';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    AuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    FormsModule,
    IconsModule,
    PaginationModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsApiKey,
    }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],

  declarations: [
    AppComponent,
    DashboardComponent,
    PlantsComponent,
    LoginComponent,
    PlantsTableComponent,
    PlantDetailComponent,
    PlantStatusComponent,
    PlantsMapComponent,
    NavSidebarComponent,
    NavTopComponent,
  ],

  providers: [AuthService, DashboardService, PlantsService, DataService, AuthGuard, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
