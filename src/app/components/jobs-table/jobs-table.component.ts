import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Job } from '../../models/job';

@Component({
  selector: 'app-jobs-table',
  templateUrl: './jobs-table.component.html',
  styleUrls: ['./jobs-table.component.sass']
})
export class JobsTableComponent implements OnInit {
  @Input() jobs: Job[];
  @Output() selectJob = new EventEmitter<Job>();
  selectedJob: Job;
  constructor() { }

  ngOnInit() { }

  select(job: Job) {
    this.selectedJob = job;
    this.selectJob.emit(job);
  }

}
