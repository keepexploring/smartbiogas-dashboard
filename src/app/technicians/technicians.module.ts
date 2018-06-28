import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TechniciansRoutingModule } from './technicians-routing.module';
import { TechnicianDetailComponent } from './components/technician-detail/technician-detail.component';
import { TechnicianFormComponent } from './components/technician-form/technician-form.component';
import { TechnicianStatusComponent } from './components/technician-status/technician-status.component';
import { TechniciansComponent } from './components/technicians/technicians.component';
import { TechniciansHeaderComponent } from './components/technicians-header/technicians-header.component';
import { TechniciansTableComponent } from './components/technicians-table/technicians-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '../icons/icons.module';
import { TechniciansService } from './services/technicians.service';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule } from '../pagination/pagination.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TechniciansRoutingModule,
    IconsModule,
    SharedModule,
    PaginationModule,
  ],
  declarations: [
    TechnicianDetailComponent,
    TechnicianFormComponent,
    TechnicianStatusComponent,
    TechniciansComponent,
    TechniciansHeaderComponent,
    TechniciansTableComponent,
  ],
  providers: [TechniciansService],
})
export class TechniciansModule {}
