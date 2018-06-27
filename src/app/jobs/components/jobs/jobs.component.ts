import { Component } from '@angular/core';

import { Job } from '../../models/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.sass'],
})
export class JobsComponent {
  selectedJob: Job;

  constructor() {}

  selectJob(job: Job): void {
    this.selectedJob = job;
  }
}
