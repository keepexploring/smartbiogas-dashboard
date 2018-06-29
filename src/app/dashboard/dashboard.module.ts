import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './services/dashboard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  declarations: [DashboardComponent],
  providers: [DashboardService],
})
export class DashboardModule {}
