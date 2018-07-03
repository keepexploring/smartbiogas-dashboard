import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './services/dashboard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CardComponent } from './components/card/card.component';
import { IconsModule } from '../icons/icons.module';
import { CardTemplateComponent } from './components/card-template/card-template.component';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, SharedModule, IconsModule],
  declarations: [DashboardComponent, CardComponent, CardTemplateComponent],
  providers: [DashboardService],
})
export class DashboardModule {}
