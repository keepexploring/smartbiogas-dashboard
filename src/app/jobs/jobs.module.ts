import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsTableComponent } from './components/jobs-table/jobs-table.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { JobStatusComponent } from './components/job-status/job-status.component';
import { IconsModule } from '../icons/icons.module';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule } from '../pagination/pagination.module';
import { MainJobTableComponent } from './components/main-job-table/main-job-table.component';
import { JobsHeaderComponent } from './components/jobs-header/jobs-header.component';

@NgModule({
  imports: [CommonModule, JobsRoutingModule, IconsModule, SharedModule, PaginationModule],
  declarations: [
    JobsComponent,
    JobsTableComponent,
    JobDetailComponent,
    JobStatusComponent,
    MainJobTableComponent,
    JobsHeaderComponent,
  ],
  exports: [JobsComponent, JobsTableComponent, JobDetailComponent, JobStatusComponent],
})
export class JobsModule {}
