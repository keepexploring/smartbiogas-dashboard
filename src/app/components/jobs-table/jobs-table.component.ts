import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Job } from '../../models/job';
import { JobsService } from '../../services/jobs.service';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-jobs-table',
  templateUrl: './jobs-table.component.html',
  styleUrls: ['./jobs-table.component.sass']
})
export class JobsTableComponent implements OnInit {
  @Input() selectable: boolean = true;
  @Input() enableModal: boolean = false;
  @Output() selectJob = new EventEmitter<Job>();

  loading: boolean = true;
  jobs: Job[];
  selectedJob: Job;

  page: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 0;
  totalPages: number;

  constructor(private service: JobsService, private helpers: HelpersService) {}

  select(job: Job): void {
    this.selectedJob = job;
    this.selectJob.emit(job);
  }

  ngOnInit() {
    this.getJobs();
  }

  onPageChange(number: number) {
    this.page = number;
    this.getJobs();
    this.loading = true;
  }

  private getJobs() {
    this.service.getJobs(this.page).subscribe((response) => {
      this.jobs = response;
      this.loading = false;
      this.totalItems = this.service.totalItems;
      this.itemsPerPage = this.service.itemsPerPage;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage)
    }, (error) => {
      this.helpers.handleError(error);
      this.loading = false;
    });
  }
}
