import { Component, OnInit, OnDestroy } from '@angular/core';
import { Technician } from '../../models/technician';
import { JobsService } from '../../../core/services/jobs.service';
import { Job } from '../../../jobs/models/job';
import { TechniciansService } from '../../services/technicians.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiResponseMeta } from '../../../shared/models/api-response-meta';

@Component({
  selector: 'app-technician-detail',
  templateUrl: './technician-detail.component.html',
  styleUrls: ['./technician-detail.component.sass'],
})
export class TechnicianDetailComponent implements OnInit, OnDestroy {
  technician: Technician;
  loading: boolean = true;
  loadingJobs = true;
  jobs: Job[];
  jobResponseMeta: ApiResponseMeta;
  title: string = 'Technician Details';
  subscriptions: Subscription[] = [];
  id: number;
  perPage: number = 5;
  totalPages: number;
  totalItems: number;

  constructor(
    private route: ActivatedRoute,
    private jobsService: JobsService,
    private techniciansService: TechniciansService,
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.techniciansService.fetchTechnician(this.id).subscribe(
      technician => {
        this.technician = technician;
      },
      error => {
        console.log(error);
      },
    );
    // this.getJobs(this.id);
    this.techniciansService.loadingSingle.subscribe(loadingSingle => {
      this.loading = loadingSingle;
    });
  }

  getJobs(id: number) {
    this.loadingJobs = true;
    this.jobsService.getUserJobs(1, id).subscribe(jobs => {
      this.jobs = jobs;
      this.totalItems = this.jobs.length;
      this.loadingJobs = false;
      this.totalPages = Math.ceil(this.totalItems / this.perPage);
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
