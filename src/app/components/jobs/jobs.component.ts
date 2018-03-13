import { Component } from '@angular/core';

import { Job } from '../../models/job';
import { JobsService } from '../../services/jobs.service';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.sass']
})
export class JobsComponent {
  selectedJob: Job;

  constructor() {}

  selectJob(job: Job): void {
    this.selectedJob = job;
  }
}
