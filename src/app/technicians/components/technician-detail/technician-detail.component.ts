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
    this.id = +this.route.snapshot.paramMap.get('id');
    this.getTechnician();
    this.getJobs(this.id);
    this.techniciansService.loadingSingle.subscribe(loadingSingle => {
      this.loading = loadingSingle;
    });
  }

  getTechnician() {
    this.subscriptions.push(
      this.techniciansService.items.subscribe(technicians => {
        const techFound = technicians.find(t => t.id == this.id);
        if (techFound) {
          this.technician = techFound;
          return;
        }
        this.techniciansService.fetchTechnician(this.id);
        return;
      }),
    );
  }

  getJobs(id: number) {
    this.subscriptions.push(
      this.jobsService.loadingUser.subscribe(loading => {
        this.loadingJobs = loading;
      }),
    );
    this.jobsService.getUserJobs(1, id).subscribe(() => {
      const sub = this.jobsService.items.subscribe(jobs => {
        const filtered = jobs.filter(job => {
          if (!job.fixers) {
            return false;
          }
          const found = job.fixers.find(fixer => {
            return fixer.id === id;
          });
          if (found) {
            return true;
          }
        });
        this.jobs = filtered;
        this.totalItems = this.jobs.length;
        this.totalPages = Math.ceil(this.totalItems / this.perPage);
      });
      this.subscriptions.push(sub);
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
