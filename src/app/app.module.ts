import { CommonModule, DatePipe, AsyncPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { IconsModule } from './icons/icons.module';
import { PaginationModule } from './pagination/pagination.module';
import { PlantsModule } from './plants/plants.module';
import { NavigationModule } from './navigation/navigation.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    CoreModule,
    AuthModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    DashboardModule,
    PlantsModule,
    PaginationModule,
    NavigationModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
  ],
  declarations: [AppComponent],
  providers: [DatePipe, AsyncPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
