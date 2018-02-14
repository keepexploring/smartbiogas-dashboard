import { Component, OnInit } from '@angular/core';

import { Job } from '../../models/job';
import { JobsService } from '../../services/jobs.service';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.sass']
})
export class JobsComponent implements OnInit {
  loading: boolean = true;
  jobs: Job[];
  selectedJob: Job;

  constructor(private service: JobsService, private helpers: HelpersService) {}

  selectJob(job: Job): void {
    this.selectedJob = job;
  }

  ngOnInit() {
    this.service.getAll().subscribe((response) => {
      this.jobs = response;
      this.loading = false;
    }, (error) => {
      this.helpers.handleError(error);
      this.loading = false;
    });
  }
}
