import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsTableComponent } from './components/jobs-table/jobs-table.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobDetailModalComponent } from './components/job-detail-modal/job-detail-modal.component';
import { JobStatusComponent } from './components/job-status/job-status.component';
import { JobsService } from './services/jobs.service';
import { IconsModule } from '../icons/icons.module';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule } from '../pagination/pagination.module';
import { MainJobTableComponent } from './components/main-job-table/main-job-table.component';

@NgModule({
  imports: [CommonModule, JobsRoutingModule, IconsModule, SharedModule, PaginationModule],
  declarations: [
    JobsComponent,
    JobsTableComponent,
    JobDetailComponent,
    JobStatusComponent,
    JobDetailModalComponent,
    MainJobTableComponent,
  ],
  exports: [
    JobsComponent,
    JobsTableComponent,
    JobDetailComponent,
    JobStatusComponent,
    JobDetailModalComponent,
  ],
  providers: [JobsService],
})
export class JobsModule {}
